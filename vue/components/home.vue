<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Convert Excel Data into JSON data</h2>
      <hr />
      <div class="schema is-centered">
        <div class="column is-half">
          <b-field class="has-text-centered">
            <b-upload @input="onFileUpload" v-model="dropFiles" multiple drag-drop>
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

          <div class="tags">
            <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
              {{file.name}}
              <button
                class="delete is-small"
                type="button"
                @click="deleteDropFile(index)"
              ></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import XLSX from 'xlsx';
export default {
  data() {
    return {
      dropFiles: [],
      schema:{},
      excelData: [],
      temp:{}
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },

  onFileUpload(value) {
      try {
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
        reader.readAsArrayBuffer(value[0]);
      } catch (error) {
        debugger;
      }
    },

    async generateFile(data){
      if(data){
        try {
          const response =   await this.$axios.post('/api/fileupload', data);
          debugger;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>