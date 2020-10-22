'use strict'

const path = require('path')
const { green, yellow, blue, red} = require('colors')
const OssClient = require('../services/oss')

// const {
//   AddCdnDomain, DescribeUserDomains, UpdateTagResources, DescribeCdnDomainConfigs, SetCdnDomainConfig,
//   DeleteSpecificConfig, SetDomainServerCertificate, DescribeCdnCertificateList,
// } = require('../oss/cdn')

// TODO check param for each config
const deploy = async (params) => {
  const oss = new OssClient(params.credentials, params.region, params.bucket)
  let path = params.env.Path
  let content = params.env.Content
  let codeUri = params.codeUri
  // console.log(path)
  // console.log(content)
  let jsonContent = toJsonContent(content)
  let targetObject = codeUri.ObjectPrefix + "/" + path
  await oss.putBuffer(targetObject, jsonContent)
  // await oss.uploadFiles(objectPrefix, localDir, includes, excludes)
}

function toJsonContent(content) {
  let json = {}
  for (const kv of content) {
    // console.log(kv.Key)
    // console.log(kv.Value)
    json[kv.Key] = kv.Value
  }
  return `var env = ` + JSON.stringify(json)
}

module.exports = {
  deployImpl: deploy
}
