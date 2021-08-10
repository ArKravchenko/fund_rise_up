import Vue from 'vue';
import {Component, Watch} from 'nuxt-property-decorator';
import FormattedValue from "../components/FormattedValue/FormattedValue.vue";

@Component({
    components: {
        FormattedValue
    }
})
export default class Root extends Vue {
    suggestionUsd;
    suggestion;
    selectedCurrency;
    toggle_exclusive;
    dialog = false;
    dialogMessage = '';

    constructor() {
        super()
        this.toggle_exclusive = 0;
        this.selectedCurrency = this.currencies[0];
        this.suggestion = String(this.computedValues[this.toggle_exclusive]);
        this.suggestionUsd = this.suggestion;
    }

    currencies = [
        {name: "US Dollar", code: "USD", symbol: "$", rate: 1},
        {name: "Euro", code: "EUR", symbol: "€", rate: 0.897597},
        {name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755},
        {name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993},
    ];

    presets = [
        40,
        100,
        200,
        1000,
        2500,
        5000
    ];

    isProcessing = false;

    postUrl = '/api/add';

    inputValidationRules = [
        (value) => {
            return !/[\D]/g.test(value)
        }
    ]

    @Watch('selectedCurrency')
    setSuggestion() {

        if (!!this.toggle_exclusive || this.toggle_exclusive === 0) {
            this.suggestion = String(this.computedValues[this.toggle_exclusive])
        }

        const foundIndex = this.computedValues.findIndex(el => el === Number(this.suggestion));

        if (foundIndex === -1) {
            this.suggestion = String(Math.round(this.suggestionUsd * this.selectedCurrency.rate))
            const foundIndexNewCurrency = this.computedValues.findIndex(el => el === Number(this.suggestion));
            this.toggle_exclusive = foundIndexNewCurrency === -1 ? null : foundIndexNewCurrency;
        } else {
            this.toggle_exclusive = foundIndex
        }
        this.suggestionUsd = Number(this.suggestion) / this.selectedCurrency.rate
    }


    typeSuggestionHandler() {
        this.suggestion = this.suggestion.replace(/\D/g, '')
        this.suggestionUsd = Number(this.suggestion) / this.selectedCurrency.rate
        const foundIndex = this.computedValues.findIndex(el => el === Number(this.suggestion));
        this.toggle_exclusive = foundIndex === -1 ? null : foundIndex;
    }

    get computedValues() {
        return this.presets.map((el) => Math.ceil(el * this.selectedCurrency.rate / 10) * 10)
    }

    submitHandler() {
        const dto = {
            amount: Number(this.suggestion),
            currency: this.selectedCurrency.code,
        }

        this.isProcessing = true;

        fetch(this.postUrl, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(dto)
        }).then(res => {
            return res.json()
        }).then((data) => {
            if (data.ok) {
                this.dialogMessage = 'Thank you for your donation!';
                this.dialog = true;
                this.isProcessing = false;
            } else {
                this.dialogMessage = 'Amount should be greater then 0';
                this.dialog = true;
                this.isProcessing = false;
            }
        }).catch(e => {
            console.log(e);
            this.dialogMessage = 'Error, try again later';
            this.dialog = true;
            this.isProcessing = false;
        })
    };

    dialogHandler() {
        this.dialog = false
    }
}