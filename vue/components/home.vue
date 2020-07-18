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
          <b-field class="has-text-centered">
          <div class="tags">
            <span v-if="newFile" class="tag is-primary">
              {{newFile.name}}
              <button
                class="delete is-small"
                type="button"
                @click="deleteDropFile"
              ></button>
            </span>
          </div>
          </b-field>
          <b-field class="has-text-centered">
            <button class="button" @click="onFileDownload">Download File</button>
          </b-field>
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
                      this.temp[key] = val[idx];
                    }
                    idx = idx + 1;
                  }
                  this.excelData.push(this.temp)
            }
          }.bind(this))
          this.generateFile(this.excelData);
        }.bind(this);
        reader.readAsArrayBuffer(value);
      } catch (error) {
        console.log(error);
      }
    },

    async generateFile(data){
      if(data){
        try {
          const payload = {
            data: data,
            name: this.filename
          }
          const response = await this.$axios.post('/api/fileupload', payload);
          this.$buefy.toast.open(response.data.message);
        } catch (error) {
          console.log(error);
        }
      }
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
      try {
        name = name ? name : "";
        const {data} = await this.$axios.get('/api/delete/files/'+name);
        if(data){
          let message = data.message;
          this.$buefy.toast.open(message);
        }
      } catch (error) {
        
      }
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