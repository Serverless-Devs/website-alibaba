'use strict'

const { Component } = require('@serverless-devs/s-core')
const { green, yellow, blue, red} = require('colors')
const { deployImpl } = require('./command-impl/deploy')
const { removeImpl } = require('./command-impl/remove')

class WebsiteComponent extends Component {
  // 部署操作
  async deploy(inputs) {
    console.log(blue('website config deploying...'))
    // 导入FC组件
    const fc = await this.load('OSSComponent', 'Component');
    console.log(JSON.stringify(fc))
    const { Project, Credentials, Properties } = inputs;

    const state = await fc.deploy({
      Args: inputs.Args,
      State: fc.state,
      Credentials,
      Project,
      Properties: Properties
    });

    await deployImpl(this.handlerInputs(inputs))
    console.log(blue('website config succeed'))
  }

  // 移除操作
  async remove(inputs) {
    console.log(blue('website config removing...'))
    await removeImpl(this.handlerInputs(inputs))
    console.log(blue('website config succeed'))
  }

  // 解析入参
  handlerInputs (inputs) {
    const properties = inputs.Properties || {}
    const credentials = inputs.Credentials || {}
    const state = inputs.State || {}
    const args = this.args(inputs.Args)

    const region = properties.Region || {}
    const bucket = properties.Bucket|| {}

    return {
      credentials, state, args, properties,
      region, bucket,
    }
  }
}

module.exports = WebsiteComponent