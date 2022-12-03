const express = require('express');
const router = express.Router();
const fs = require('fs');
const PythonShell = require('python-shell').PythonShell;
const desafios = require('../resources/python.json');

router.post('/python/desafio1', async(request, response) => {
  let method = request.body.method;
  let code = request.body.code.replace('{code}', method);
  fs.writeFileSync('challenge.py', code, {encoding: 'utf8'});

  const casosDeTeste = {
    primeiro: [1, 4, 5],
    segundo: [10, -10, 0],
    terceiro: [28, 42, 70]
  }

  const promises = [];
  const resultados = [];

  Object.keys(casosDeTeste).forEach((key) => {
      promises.push(
        new Promise((resolve, reject) => {
          PythonShell.run(
            "challenge.py",
            {
              mode: "text",
              pythonOptions: ["-u"],
              args: casosDeTeste[key],
            },
            function (err, results) {
              if (err) {
                reject();
                throw err;
              }
              
              resultados.push(results[0]);
              resolve(true);
            }
          );
        })
      );
  });

  Promise.all(promises).then(() => {
      response.json( {
        resultado: resultados[0] && resultados[1] && resultados[2],
        teste_1: resultados[0],
        teste_2: resultados[1],
        teste_3: resultados[2]
      } );
  });
});

router.post('/python/desafio2', async(request, response) => {
  let method = request.body.method;
  let code = request.body.code.replace('{code}', method);
  fs.writeFileSync('challenge.py', code, {encoding: 'utf8'});

  const casosDeTeste = {
    primeiro: [10, 0, 0],
    segundo: [10, -2, -20],
    terceiro: [17, 6, 102]
  }

  const promises = [];
  const resultados = [];

  Object.keys(casosDeTeste).forEach((key) => {
      promises.push(
        new Promise((resolve, reject) => {
          PythonShell.run(
            "challenge.py",
            {
              mode: "text",
              pythonOptions: ["-u"],
              args: casosDeTeste[key],
            },
            function (err, results) {
              if (err) {
                reject();
                throw err;
              }
              
              resultados.push(results[0]);
              resolve(true);
            }
          );
        })
      );
  });

  Promise.all(promises).then(() => {
    response.json( {
      resultado: resultados[0] && resultados[1] && resultados[2],
      teste_1: resultados[0],
      teste_2: resultados[1],
      teste_3: resultados[2]
    } );
  });
});

router.post('/python/desafio3', async(request, response) => {
  let method = request.body.method;
  let code = request.body.code.replace('{code}', method);
  fs.writeFileSync('challenge.py', code, {encoding: 'utf8'});

  const casosDeTeste = {
    primeiro: [10, 'par'],
    segundo: [12, 'par'],
    terceiro: [57, 'impar']
  }

  const promises = [];
  const resultados = [];

  Object.keys(casosDeTeste).forEach((key) => {
      promises.push(
        new Promise((resolve, reject) => {
          PythonShell.run(
            "challenge.py",
            {
              mode: "text",
              pythonOptions: ["-u"],
              args: casosDeTeste[key],
            },
            function (err, results) {
              if (err) {
                reject();
                throw err;
              }
              
              resultados.push(results[0]);
              resolve(true);
            }
          );
        })
      );
  });

  Promise.all(promises).then(() => {
    response.json({
      resultado: resultados[0] && resultados[1] && resultados[2],
      teste_1: resultados[0],
      teste_2: resultados[1],
      teste_3: resultados[2]
    });
  });
});

router.post('/python/desafio4', async(request, response) => {
  let method = request.body.method;
  let code = request.body.code.replace('{code}', method);
  fs.writeFileSync('challenge.py', code, {encoding: 'utf8'});

  const casosDeTeste = {
    primeiro: [3, 4, 5],
    segundo: [6, 8, 10],
    terceiro: [28, 21, 35]
  }

  const promises = [];
  const resultados = [];

  Object.keys(casosDeTeste).forEach((key) => {
      promises.push(
        new Promise((resolve, reject) => {
          PythonShell.run(
            "challenge.py",
            {
              mode: "text",
              pythonOptions: ["-u"],
              args: casosDeTeste[key],
            },
            function (err, results) {
              if (err) {
                reject();
                throw err;
              }
              
              resultados.push(results[0]);
              resolve(true);
            }
          );
        })
      );
  });

  Promise.all(promises).then(() => {
    response.json( {
      resultado: resultados[0] && resultados[1] && resultados[2],
      teste_1: resultados[0],
      teste_2: resultados[1],
      teste_3: resultados[2]
    } );
  });
});

router.post('/python/desafio5', (request, response) => {  
  let method = request.body.method;
  let code = request.body.code.replace('{code}', method);
  fs.writeFileSync('challenge.py', code, {encoding: 'utf8'});

  const casosDeTeste = {
    primeiro: [5, 5, 30],
    segundo: [6, 2, 18],
    terceiro: [10, 3, 40]
  }

  const promises = [];
  const resultados = [];
  let errorPythonShell = false;

  Object.keys(casosDeTeste).forEach((key) => {
    promises.push(
      new Promise((resolve, reject) => {
        PythonShell.run(
          "challenge.py",
          {
            mode: "text",
            pythonOptions: ["-u"],
            args: casosDeTeste[key],
          },
          function (err, results) {
            if (err) {
              reject();
              throw err;
            }
            
            resultados.push(results[0]);
            resolve(true);
          }
        );
      })
    );
  });

  Promise.all(promises).then(() => {
    response.json( {
      resultado: resultados[0] && resultados[1] && resultados[2],
      teste_1: resultados[0],
      teste_2: resultados[1],
      teste_3: resultados[2]
    });
  });
});

router.get('/retrievechallenges', async(request, response) => {
  try {
    return response.status(200).send({desafios})
  } catch (error) {
    return response.status(404).send({ error: 'Unexpected error when loading the challenges'})
  }
})

module.exports = app => app.use('/bootcamp', router);