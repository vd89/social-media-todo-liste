/* eslint-disable require-jsdoc */
export default class {
  static async _getUserByID(userId) {
    try {
      return await this.aggregate([{ $match: { _id: `${userId}` } }]);
    } catch (err) {
      throw err;
    }
  }
}
