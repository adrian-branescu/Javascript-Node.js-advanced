FROM mihai1voicescu/badass-jupyter:latest

COPY . /usr/project/hw1

WORKDIR /usr/project/hw1

RUN npm i

# final comand to run
CMD npm run serve & jupyter notebook /usr/project --ip=0.0.0.0 --allow-root --NotebookApp.token='' --NotebookApp.password=''
