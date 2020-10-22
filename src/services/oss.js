const Oss = require('ali-oss')
const fs = require('fs')
const path = require('path')
const { green, yellow, blue, red} = require('colors')

class OssClient {
  constructor(credentials, region, bucketName) {
    // if (!bucketName) {
    //   this.ossClient = new Oss({
    //     region: 'oss-' + region,
    //     accessKeyId: credentials.AccessKeyID,
    //     accessKeySecret: credentials.AccessKeySecret,
    //     timeout: 30 * 1000
    //   })
    // }

    this.ossClient = new Oss({
      region: 'oss-' + region,
      accessKeyId: credentials.AccessKeyID,
      accessKeySecret: credentials.AccessKeySecret,
      bucket: bucketName
    })
  }

  async putBuffer (targetObject, buffer) {
    try {
      let result = await this.ossClient.put(targetObject, Buffer.from(buffer));
      // console.log(result);
    } catch (e) {
      console.log(e);
    }
  }


  async getBucketInfo(bucketName) {
    // console.log(bucketName)
    try {
      return await this.ossClient.getBucketInfo(bucketName)
    } catch (error) {
      // 指定的存储空间不存在。
      if (error.name !== 'NoSuchBucketError') {
        console.log(error)
      }
    }
  }

  // 创建存储空间
  async putBucket(bucketName, options) {
    try {
      await this.ossClient.putBucket(bucketName, options)
    } catch (err) {
      console.log(err)
    }
  }

  async deleteBucket(bucketName) {
    try {
      const result = await this.ossClient.deleteBucket(bucketName)
      // console.log(result)
    } catch (err) {
      console.log(err)
    }
  }


  // 设置Bucket标签
  async putBucketTags(bucketName, tag) {
    try {
      let result = await this.ossClient.putBucketTags(bucketName, tag)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  //获取Bucket标签
  async getBucketTags(bucketName) {
    try {
      let result = await this.ossClient.getBucketTags(bucketName)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  // 删除Bucket标签
  async deleteBucketTags(bucketName) {
    try {
      let result = await this.ossClient.deleteBucketTags(bucketName)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async putBucketCORS(bucket, options) {
    try {
      await this.ossClient.putBucketCORS(bucket, options).then((result) => {
      })
    } catch (e) {
      console.log(e)
    }
  }

  async deleteBucketCORS(bucket) {
    try {
      await this.ossClient.deleteBucketCORS(bucket)
    } catch (e) {
      console.log(e)
    }
  }

  async putBucketReferer(bucket, allowEmptyReferer, options) {
    try {
      let result = await this.ossClient.putBucketReferer(bucket, allowEmptyReferer, options)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async getBucketReferer(bucket) {
    try {
      let result = await this.ossClient.getBucketReferer(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteBucketReferer(bucket) {
    try {
      let result = await this.ossClient.deleteBucketReferer(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async putBucketACL(bucket, acl) {
    // 此处以创建Bucket后修改其访问权限为private为例。
    try {
      await this.ossClient.putBucketACL(bucket, acl)
    } catch (e) {
      console.log(e)
    }
  }

  // 获取存储空间的访问权限
  async getBucketAcl(bucket) {
    try {
      const result = await this.ossClient.getBucketACL(bucket)
      return result.acl
    } catch (e) {
      console.log(e)
    }
  }

  async putBucketLifecycle(bucket, options) {
    try {
      return await this.ossClient.putBucketLifecycle(bucket, options)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteBucketLifecycle(bucket) {
    try {
      return await this.ossClient.deleteBucketLifecycle(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async putBucketLogging(bucket, prefix) {
    try {
      let result = await this.ossClient.putBucketLogging(bucket, prefix)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async getBucketLogging(bucket) {
    try {
      let result = await this.ossClient.getBucketLogging(bucket)
      console.log(JSON.stringify(result.res.data.toString()))
    } catch (e) {
      console.log(e)
    }
  }

  async deleteBucketLogging(bucket) {
    try {
      let result = await this.ossClient.deleteBucketLogging(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async putBucketEncryption(bucket, options) {
    try {
      // 配置Bucket加密方式
      let result = await this.ossClient.putBucketEncryption(bucket, options)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async getBucketEncryption(bucket) {
    try {
      let result = await this.ossClient.getBucketEncryption(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteBucketEncryption(bucket) {
    try {
      //删除Bucket的加密配置。
      let result = await this.ossClient.deleteBucketEncryption(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  // 设置存储空间版本控制状态为Enabled或Suspended
  async putBucketVersioning(bucket, status) {
    const options = {
      "status": status,
    } // `Enabled` or `Suspended`
    const result = await this.ossClient.putBucketVersioning(bucket, status)
    // console.log(result)
  }

  async putBucketWebsite(bucket, options) {
    try {
      let result = await this.ossClient.putBucketWebsite(bucket, options)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async getBucketWebsite(bucket) {
    try {
      let result = await this.ossClient.getBucketWebsite(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteBucketWebsite(bucket) {
    try {
      let result = await this.ossClient.deleteBucketWebsite(bucket)
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }


  async uploadFile(target, local, includes, excludes) {
    try {
      let upload = true
      // console.log(`local ${local}`)
      for (const e of excludes) {
        if (local.indexOf(e) === 0) {
          // console.log(`exclude ${local}`)
          upload = false
        }
      }
      for (const i of includes) {
        if (local.indexOf(i) === 0) {
          // console.log(`include ${local}`)
          upload = true
        }
      }
      if (upload) {
        let result = await this.ossClient.put(target, local)
        console.log(green(`upload to oss ${target} succeed`))
      }
      // console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  async uploadFiles(objectPrefix, localDir, includes, excludes) {
    let docs = fs.readdirSync(localDir)
    for (const doc of docs) {
      let localPath = localDir + '/' + doc
      let targetPath = objectPrefix + '/' + doc
      let st = fs.statSync(localPath)
      // 判断是否为文件
      if (st.isFile() && doc !== '.DS_Store') {
        await this.uploadFile(targetPath, localPath, includes, excludes)
        // console.log(_src+'是文件',_dist)
      }
      else if (st.isDirectory()) {
        // console.log(_src+'是文件夹')
        await this.uploadFiles(targetPath, localPath, includes, excludes)
      }
    }

  }
}

module.exports = OssClient
