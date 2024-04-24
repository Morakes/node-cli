import inquirer from 'inquirer';
import shell from 'shelljs';
import axios from 'axios';
import AdmZip from 'adm-zip';

const projects = {
  projectA: 'https://github.com/Morakes/juejinblog/archive/refs/heads/main.zip',
  projectB: 'https://github.com/Morakes/juejinblog/archive/refs/heads/main.zip',
  projectC: 'https://github.com/Morakes/juejinblog/archive/refs/heads/main.zip',
};

inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: '请选择要下载的项目：',
      choices: Object.keys(projects),
    }
  ]).then(async answers => {
    console.log(answers);
    const projectUrl = projects[answers.project];
    console.log(`开始下载项目：${answers.project}...`);
  
    try {
      const response = await axios({
        method: 'GET',
        url: projectUrl,
        responseType: 'arraybuffer'
      });
  
      console.log(`下载成功，开始解压...`);
      const zip = new AdmZip(response.data);
      zip.extractAllTo(`./${answers.project}`, true);
      console.log('项目解压成功！');
    } catch (error) {
      console.error(`下载失败：${error.message}`);
    }
  }).catch(error => {
    console.error('发生错误：', error);
  });