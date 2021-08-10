import Vue from 'vue';
import {Component, Prop} from 'nuxt-property-decorator';

@Component()
export default class FormattedValue extends Vue {
    @Prop({
        type: Number,
        required: true
    }) value;
    @Prop({
        type: String,
        default: "en-US",
        required: false
    }) locale;
    @Prop({
        type: String,
        required: true
    }) symbol;
}
