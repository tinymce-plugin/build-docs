import path, { join } from "node:path";
import fs from "fs";
import path from "node:path";
export const mkdirPath = (dirname) =>{
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirPath(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }

  export const  mkdirs = (root:any,pathname, callback) => {
    // 需要判断是否是绝对路径（避免不必要的 bug）

    // 获取相对路径
    pathname = path.relative(root, pathname);
  
    // path.sep 避免平台差异带来的 bug
    const floders = pathname.split(path.sep);
  
    let pre = ''; // 最终用来拼合的路径
    floders.forEach(floder => {
      try {
        // 没有异常，文件已经创建，提示用户该文件已经创建
        const _stat = fs.statSync(path.join(root, pre, floder));
        const hasMkdir = _stat && _stat.isDirectory();
        if (hasMkdir) {
          callback // && callback(`文件${floder}已经存在，不能重复创建，请重新创建！`)
        }
      } catch (err) {
        // 抛出异常，文件不存在则创建文件
        try {
          // 避免父文件还没有创建的时候，先创建子文件所出现的意外 bug，这里选择同步创建文件
          fs.mkdirSync(path.join(root, pre, floder));
          callback && callback(null);
        } catch (error) {
          callback && callback(error);
        }
      }
      pre = path.join(pre, floder); // 路径拼合
    });
  }

/* 判断文件存在 */
export const isFileExisted = (path_way) => {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        reject(false);//"不存在"
      } else {
        resolve(true);//"存在"
      }
    })
  })
};

export const delPath = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, function(err, stat) {
      if(err) reject(err)
      if(!stat) {
        resolve('')
        return ''
      }
      if(stat.isFile()) {
        fs.unlink(filePath, function(err) {
          if(err) reject(err)
          resolve('')
        })
      }else {
        fs.readdir(filePath, function(err, dirs) {
          if(err) reject(err)
          dirs = dirs.map(dir => path.join(filePath, dir)) // a/b a/c
          let index = 0;
          (function next() {
            if(index === dirs.length) {
              fs.rmdir(filePath, function(err) {
                if(err) reject(err)
                resolve('')
              })
            }else {
              delPath(dirs[index++]).then(() => {
                next()
              }, err => {
                reject(err)
              })
            }
          })()
        })
      }
    })
  })
}
export const isExternalLinks = (url) => {
  const reg = /^(https?:|mailto:|tel:|ftp:)/;
  return reg.test(url);
}
export const getImageInfo = (url) => {
  let resObj = {

  }
  let alignObj = {
    l: 'left',
    r: 'right',
    c: 'center'
  }
  url.replace(/([^?=&#]+)/g,function(match, key,val){
     if(val&&key){
      key.replace(/^pic_([left|center|right])/,function(m,k){
            resObj.align = alignObj[k]
            return m
      })
       key.replace(/^([0-9]+)[x|X]([0-9]+)/,function(m,x,y){
        resObj.width = x
        resObj.height = y
         return m
       })
     }
        return match
  })

  return resObj
}
function createHash (hashLength) {
	if (!hashLength || typeof(Number(hashLength)) != 'number') {return;}
	var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	var hs = [];
	var hl = Number(hashLength);
	var al = ar.length;
	for (var i = 0; i < hl; i ++) {
		hs.push(ar[Math.floor(Math.random() * al)]);
	}
	
	return hs.join('');
}
let timeTem = new Date().getTime()

// copy dir
export const  copyDir = async(src, dest,include='.md$' )=>{
   
  if (!fs.existsSync(src)) {
    return false;
  }
  const files = fs.readdirSync(src);
  if (files&&files.length>0&&!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  files.forEach(async(file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest,/\-info.md$/.test(file) ?file:file.replace(/.md$/,'_t_'+createHash(6)+timeTem+'_p_.md'));
    if (fs.statSync(srcPath).isDirectory()&&srcPath.indexOf('.github')===-1) {
     await  copyDir(srcPath, destPath);
    } else if(new RegExp(include).test(file)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
return 'ok'
}