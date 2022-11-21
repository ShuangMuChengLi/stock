var express = require('express');
var router = express.Router();
let path = require('path');
let fs = require('fs');
let url = require('url');
let _ = require('lodash');
/* GET home page. */
router.get('/', async (req, res)=>{
  let arg = url.parse(req.url, true).query;
  let projectPath = path.resolve(__dirname, `../data/${arg.name}.json`);
  fs.readFile(projectPath, (err, data)=>{
    if(err){
      console.error(err);
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
      res.end(JSON.stringify({
        'code': 200,
        'message': '查询成功',
        'success': true,
        'data': []
      }));
      return;
    }

    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    res.end(JSON.stringify({
      'code': 200,
      'message': '查询成功',
      'success': true,
      'data': JSON.parse(data)
    }));
  });


});
router.post('/', async (req, res)=>{
  let fields = req.body;
  let projectPath = path.resolve(__dirname, `../data/${fields.name}.json`);
  fs.writeFile(projectPath, JSON.stringify(fields.data, null, 2), (err)=>{
    if(err){
      console.error(err);
    }
  });

  res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
  res.end(JSON.stringify({
    'code': 200,
    'message': '添加成功',
    'success': true,
    'result': null
  }));
});

module.exports = router;
