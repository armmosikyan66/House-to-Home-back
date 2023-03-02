import {model, Schema} from "mongoose";

const Properties = new Schema({
    type: {
        am: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    imageUrl: [{
        type: String,
        required: true,
        default: ""
    }],
    public: {
        type: Boolean,
        required: false,
        default: false,
    },
    status: {
        am: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
    },
    author: {
        type: String,
        required: true,
    },
    prdId: {
        type: Number,
        required: true,
    },
    title: {
        am: {
            type: String,
            required: false,
            default: ""
        },
        en: {
            type: String,
            required: false,
            default: ""
        },
        ru: {
            type: String,
            required: false,
            default: ""
        },
    },
    desc: {
        am: {
            type: String,
            required: false,
            default: ""
        },
        en: {
            type: String,
            required: false,
            default: ""
        },
        ru: {
            type: String,
            required: false,
            default: ""
        },
    },
    floorArea: {
        type: Number,
        required: false,
        default: 0,
    },
    rooms: {
        type: Number,
        required: false,
        default: 0,
    },
    furniture: {
        type: Boolean,
        required: false,
        default: false
    },
    baths: {
        type: Number,
        required: true,
        default: 0,
    },
    elevator: {
        type: Boolean,
        required: true,
        default: false,
    },
    address: {
        type: String,
        required: false,
        default: ""
    },
    city: {
        am: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
    },
    region: {
        am: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
    },
    newBuilding: {
        type: Boolean,
        required: false,
        default: false,
    },
    floorsCount: {
        type: Number,
        required: false,
        default: 0
    },
    currentFloor: {
        type: Number,
        required: false,
        default: 0
    },
    ceilingHeight: {
        type: Number,
        required: false,
        default: 0
    },
    balcony: {
        type: Boolean,
        required: false,
        default: false,
    },
    plotArea: {
        type: Number,
        required: false,
        default: 0
    },
    buildingType: {
        am: {
            type: String,
            required: false,
            default: "",
        },
        en: {
            type: String,
            required: false,
            default: "",
        },
        ru: {
            type: String,
            required: false,
            default: "",
        },
    },
}, {
    timestamps: true
});

export default model("Products", Properties);