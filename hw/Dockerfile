FROM adrianbranescu93/jupyter-node:latest

COPY . /usr/project/hw

WORKDIR /usr/project/hw

RUN npm i

# final comand to run
CMD npm run serve & jupyter notebook /usr/project --ip=0.0.0.0 --allow-root --NotebookApp.token='' --NotebookApp.password=''
