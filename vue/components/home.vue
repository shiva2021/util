<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h2 class="title has-text-centered">Convert Excel Data into JSON data</h2>
          <hr />
          <b-field class="has-text-centered">
            <b-upload @input="onFileUpload" v-model="newFile" native drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon pack="fas" icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <div v-if="filename" style="margin-bottom:5%">
            <hr/>
            <h2 class="subtitle has-text-centered" v-if="filename">Your file ready for download!</h2>
          </div>
          <b-field style="margin-bottom:5%">
            <div class="container has-text-centered">
              <div class="tags has-text-centered is-centered">
                <span v-if="newFile" class="tag is-primary">
                  {{filename}}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile"
                  ></button>
                </span>
              </div>
            </div>
          </b-field>
          <b-field class="has-text-centered" v-if="filename">
            <button class="button" @click="onFileDownload">Download File</button>
          </b-field>
          <hr />
          <h2 class="title has-text-centered">Follow these simple instructions</h2>
          <div class="container-fluid">
            <ul style="line-height:2rem">
              <li>
                <div class="container">
                  <p class="subtitle">You can convert <b>one</b> excel sheet to JSON at a time.</p>
                </div>
              </li>
              <li>
                <div class="container">
                  <p class="subtitle">The Excel sheet must have the names of the columns in the first row.</p>
                </div>
              </li>
              <li>
                <div class="container">
                  <p class="subtitle">Click on the upload section to upload the file or simply drag and drop the excel sheet.The JSON file will be readily available for download.</p>
                </div>
              </li>
              <li>
                <div class="container">
                  <p class="subtitle">Remember that the tool will not retain any data. On closing the browser, or page refresh, the JSON file will be deleted from the server.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import XLSX from 'xlsx';
import Slug from 'slug';
export default {
  data() {
    return {
      newFile: null,
      schema:{},
      excelData: [],
      temp:{},
      filename:""
    };
  },
  async created(){
      this.deleteFiles();
  },
  methods: {
      deleteDropFile() {
        this.deleteFiles(this.filename);
        this.clearFields();
      },

    onFileUpload(value) {
      try {
        this.filename = Slug(value.name.split('.')[0], '-').toLowerCase();
        let reader = new FileReader();
        reader.onload = function(e) {
          const loader = this.$buefy.loading.open();
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, { type: "array" });
          var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
          var data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
          jQuery.each(data, function(i, val){
            let aResult = [];
            this.temp = jQuery.extend(true, {}, this.schema);
            if(i === 0){
              for (let j = 0; j < val.length; j++) {
                const element = val[j];
                this.schema[element] = '';
              }
            }else{
                  let idx = 0;
                  for (const key in this.temp) {
                    if (this.temp.hasOwnProperty(key)) {
                      this.temp[key] = val[idx] ? val[idx] : "";
                    }
                    idx = idx + 1;
                  }
                  this.excelData.push(this.temp)
            }
          }.bind(this))
          this.generateFile(this.excelData);
          loader.close();
        }.bind(this);
        reader.readAsArrayBuffer(value);
      } catch (error) {
        console.log(error);
      }
    },

    async generateFile(data){
      const loader = this.$buefy.loading.open();
      if(data){
        try {
          const payload = {
            data: data,
            name: this.filename
          }
          const response = await this.$axios.post('/api/fileupload', payload);
          this.$buefy.toast.open(response.data.message);
          this.excelData = [];
          this.temp = [];
          this.schema = {};
        } catch (error) {
          console.log(error);
        }
      }
      loader.close()
    },

    async onFileDownload(){
      try {
        if(!this.filename){
          this.$buefy.toast.open('Nothing has been been uploaded yet!')
          return false;
        }
        window.open(location.origin+'/api/getfile/'+this.filename, '_blank')
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFiles(name){
        const loader = this.$buefy.loading.open();
      try {
        name = name ? name : "";
        const {data} = await this.$axios.get('/api/delete/files/'+name);
        if(data){
          let message = data.message;
          this.$buefy.toast.open(message);
        }
      } catch (error) {
        
      }
      loader.close();
    },

    clearFields(){
      this.filename = "";
      this.newFile = null;
      this.schema = {};
      this.excelData = [];
      this.temp ={};
    }
  }
};
</script>