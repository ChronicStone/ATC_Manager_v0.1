<template>
   <div>
        <vx-card>
            <div class="w-1/8">            
                <vue-tel-input class="mb-8 w-1/6 rounded border-success" style="" v-model="value" wrapperClasses="rounded"></vue-tel-input>
            </div>
            <vs-button @click.prevent="MailAssignTest()">Send mail</vs-button>

        </vx-card>

     <vue-html2pdf
        :show-layout="false"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
 
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <!-- PDF Content Here -->
        </section>
    </vue-html2pdf>
   </div>
</template>
<script>
import VueHtml2pdf from 'vue-html2pdf';
import axios from "axios";
import emailjs from 'emailjs-com';

export default {
    methods: {
        /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },
        MailAssignTest(email, fname, secure_code) {
            var templateParams = {
                "candidate_email": email,
                "candidate_fname": fname,
                "secure_code": secure_code,
            };
            var service_id = "default_service";
            var template_id = "assign_test";
            var user_id = "user_g6iQmMyQ1Tl2VcSdVzJPY"
            emailjs.send(service_id , template_id, templateParams, user_id)
                .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                this.$vs.notify({
                                title:'Success',
                                text:response.status + ' : ' + response.text,
                                color:'success'
                            })
                }, 
                (err) => {
                console.log('FAILED...', err);
            });
        }
    },
 
    components: {
        VueHtml2pdf
    }
}
</script>

<style scoped>
ul {
    background: black;
}
</style>