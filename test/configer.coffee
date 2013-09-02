fs = require('fs')
configer = require('../lib/configer')
debug = require('dever').debug('Test configer')

testConfigFile = './test/start.json'
testConfigJSON =
'''
{
  "server": {
    "port": 8899,
    "host": "./public/"
  }
}
'''

describe 'configer.load()', ->
  before ->
    fs.writeFileSync testConfigFile, testConfigJSON

  after ->
    fs.unlinkSync testConfigFile

  it 'should be a function', ->
    configer.load.should.be.a 'function'

  it 'should load configuration file', ->
    result = configer.load testConfigFile
    result.server.should.be.a 'object'
    result.server.port.should.eql 8899
    result.server.host.should.eql './public/'

describe 'configer.parse()', ->
  it 'should parse configuration JSON to an object', ->
    result = configer.parse testConfigJSON
    result.server.should.be.a 'object'
    result.server.port.should.eql 8899
    result.server.host.should.eql './public/'
