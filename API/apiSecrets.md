# Поддержка работы с секретами

Для хранения чувствительных данных (логины, пароли, хеши) пользователи могут воспользоваться сервисом [OpenBao](https://openbao.org/), который поставляется с дистрибутивом. У сервиса есть UI. Через него клиенты записывают в защищенное хранилище  важные данные, чтобы затем использовать их в скриптах.

Такие данные называются секретами. Они бывают разных видов. Поддерживаемые типы: 
- OpenBaoKeyValueSecret (ключ-значение).

## Quick start

Посмотрим на пример получения секрета из хранилища и разберем, что здесь происходит:

```typescript

let secret = om.secrets.getStorage('openbao-vault').getSecret('it-gets-secret-path', 'it-gets-secret-key')

```

Интерфейс ***secrets** представляет метод `getStorage()`. В него передается идентификатор хранилища. Доступы к ним настраиваются в манифесте проекта администраторами. 

К одному проекту могут быть подключены сразу несколько хранилищ. В одном скрипте можно обращаться сразу к нескольким.

```typescript

let baoSecret = om.secrets.getStorage('openbao-vault').getSecret(
    'several-vaults-single-script-openbao-path',
    'several-vaults-single-script-openbao-key'
)

let hashiSecret = om.secrets.getStorage('hashicorp-vault').getSecret(
    'several-vaults-single-script-hashicorp-path',
    'several-vaults-single-script-hashicorp-key'
)
```

Поддерживаются решения [OpenBao](https://openbao.org/) и [Hashicorp Vault](https://www.vaultproject.io/). Список подключенных хранилищ можно посмотреть в админке в разделе `/secrets`.

### Структура секретов

Секреты в хранилищах хранятся в иерархиях.

```
/secret/path/to/secrets
|--- secret-key-1
|--- secret-key-2
```

Найти секрет в хранилище можно, зная "папку", в которой он лежит (путь) и название самого секрета (ключ). Поэтому метод `getSecret()`, доступный в объекте хранилища, принимает в качестве аргумента два этих параметра.

Обратившись к хранилищу за секретом, вы получите объект Secret. Его можно преобразовать в JSON-объект и работать с ним обычным способом.

```typescript

console.log(secret.toJson().type);
console.log(secret.toJson().params.key);
console.log(secret.toJson().params.value);

{
    "type":"OpenBaoKeyValueSecret",
    "params": {
        "key":"it-gets-secret-key",
        "path":"it-gets-secret-path"
    }
}
```

Обратите внимание, что значения секрета в объекте нет. Так сделано для безопасности. Значения раскрываются только на backend'е. Передавайте в скриптах в доступные методы API объекты секретов. Backend сам сделает запрос в хранилище и подставит значение секрета, где это нужно.

```typescript

let secret = om.secrets.getStorage('openbao-vault').getSecret('ftp-adapter-path', 'ftp-adapter-port')

let fs = om.filesystems.ftp();

fs.setPort(secret);
```

Не обязательно явно забирать секрет из хранилища, чтобы передать его на backend. Можно самостоятельно собрать неклассифицированный объект V8 и воспользоваться им.

```typescript

const NCSecret = {
    "type": "OpenBaoKeyValueSecret",
    "params": {
        "storageIdentifier": "openbao-vault",
        "path": "nc-secret-port-path",
        "key": "nc-secret-port-key"
    }
}

let fs = om.filesystems.ftp();
fs.setPort(NCSecret);
```

Валидация по-прежнему работает в методах API, даже на значениях секретов. Если тип значения не совпадет с тем, который ожидается методом API, вылетит ошибка. 

```typescript
let secret = om.secrets.getStorage('openbao-vault').getSecret('ftp-bad-secret-path', 'ftp-bad-secret-port')

let fs = om.filesystems.ftp();

fs.setPort(secret);
console.log(fs.getPort());
```

### Use-кейсы

Объекты секретов можно передавать в качестве env-параметров из одних скриптов в другие 

```typescript
const targetScript = om.common.resultInfo()
    .actionsInfo()
    .makeMacrosAction('testChainEnvironment_2');

const envSecret = om.secrets.getStorage('openbao-vault').getSecret('env-chainset-path', 'env-chainset-key')

targetScript.environmentInfo().set('ENV_SECRET', envSecret);
targetScript.appendAfter();
```

### Интерфейсы и изменения в API

Интерфейсы функционала описаны в декларации

```typescript
export interface Secrets {
    getStorage(vaultId: string): SecretStorage;
}

export interface SecretStorage {
    getSecret(path: string, key: string): SecretValue
}

export interface SecretValue {
    getStorageIdentifier(): string;
    getIdentifier(): string;
    toJson(): object;
}
```

В некоторые методы, добавлена поддержка секретов. Прежний код, передающий в них скалярные аргрументы, должен работать без изменений. У вас появляется выбор - можно использовать и скалярные типы, и секреты. Опознать методы с новыми возможностями можно по изменениям в сигнатурах.

```typescript

export interface SnowflakeConnectorBuilder extends SqlConnectorBuilder {
    setAccount(account: string|SecretValue): SnowflakeConnectorBuilder;

    setRegion(region: string|SecretValue): SnowflakeConnectorBuilder;

    // ...
}
```
