'use strict'

const path = require('path')
const { green, yellow, blue, red} = require('colors')
const OssClient = require('../services/oss')

const deploy = async (params) => {
  const oss = new OssClient(params.credentials, params.region, params.bucket)
  let path = params.env.Path
  let content = params.env.Content
  let codeUri = params.codeUri
  let jsonContent = toJsonContent(content)
  let prefix = ""
  if (codeUri.ObjectPrefix) {
    prefix = codeUri.ObjectPrefix
  }
  let targetObject = prefix + "/" + path
  await oss.putBuffer(targetObject, jsonContent)
}

function toJsonContent(content) {
  let json = {}
  for (const kv of content) {
    json[kv.Key] = kv.Value
  }
  return `var env = ` + JSON.stringify(json)
}

module.exports = {
  deployImpl: deploy
}
