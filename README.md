
# **BackEnd Setup**
```command
cd backend 
```
```command
npm install 
```
```
docker compose up
```
Open Argent , change to network localhost (:5050), add new account. only do this when resetting the docker. if not just skip. Account already deployed and working.

in another terminal ( same folder )
```
yarn compile
```
```
yarn deploy
```
# **FrontEnd Setup**
```
npm install
```
```
yarn dev
```
# **Some Checks**

Connect To argent

Check that Balance is updated after using the `Faucet`

Check that balance is updated after using the `Increase Balance`
