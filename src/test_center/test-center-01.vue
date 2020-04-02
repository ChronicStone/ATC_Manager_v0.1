<template>
   <div>
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
import VueHtml2pdf from 'vue-html2pdf'
 
export default {
    methods: {
        /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        }
    },
 
    components: {
        VueHtml2pdf
    }
}
</script>

<style scoped>

</style>