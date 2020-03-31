import Vue from 'vue';
import moment from 'moment'

// Phone number formating filter
Vue.filter('phone', function (phone) {
    return phone.replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});


Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('uppercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
});

Vue.filter('formatDateTime', function(value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
});


Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY')
    }
});

Vue.filter('ConvertCECR', function(value) {
    if(value) {
        if(value == -1) {return '0'}
        else if(value >= 0 && value <= 17) {return 'A1'}
        else if(value >= 18 && value <= 26) {return 'A2.1'}
        else if(value >= 27 && value <= 34) {return 'A2.2'}
        else if(value >= 35 && value <= 45) {return 'B1.1'}
        else if(value >= 46 && value <= 55) {return 'B1.2'}
        else if(value >= 56 && value <= 68) {return 'B2.1'}
        else if(value >= 69 && value <= 80) {return 'B2.2'}
        else if(value >= 81 && value <= 90) {return 'C1.1'}
        else if(value >= 91 && value <= 99) {return 'C1.2'}
        else if(value == 100) {return 'C2'}
        else return ''
    }
});
