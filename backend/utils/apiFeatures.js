class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};

        this.query = this.query.find({...keyword});

        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr}

        //remove some fields for category
        const removeFields =["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        //Filter for Price and rating
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        
        this.query = this.query.find(JSON.parse(querystr));

        return this;

    }

    pagination(resultPerPage) {
        const currentpage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentpage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;