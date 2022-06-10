# JavaScript advanced

## Lab environment

To launch the notebook server for this lab:
### Bash
```
docker run --name js-advanced --rm -v "$(pwd)"/lab:/usr/project/lab -p 8888:8888 adrianbranescu93/jupyter-node
```

```
docker run --name js-advanced-interactive -it --entrypoint /bin/bash -v "$(pwd)/lab":/usr/project/lab adrianbranescu93/jupyter-node
```

### PowerShell
```
docker run --name js-advanced --rm -v "$pwd\lab:/usr/project/lab" -p 8888:8888 adrianbranescu93/jupyter-node
```

```
docker run --name js-advanced-interactive -it --entrypoint /bin/bash -v "$pwd\lab:/usr/project/lab" adrianbranescu93/jupyter-node
```
