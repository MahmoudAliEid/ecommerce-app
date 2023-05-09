class apiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCpy = { ...this.queryStr };
    const remove = ["keyword", "limit", "page"];
    remove.forEach((ele) => delete queryCpy[ele]);
    let queryStr = JSON.stringify(queryCpy);
    queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resPage) {
    const currPage = Number(this.queryStr.page) || 1;
    const skip = resPage * (currPage - 1);
    this.query = this.query.limit(resPage).skip(skip);
    return this;
  }
}

module.exports = apiFeature;
