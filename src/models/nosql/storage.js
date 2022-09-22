const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const StorageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: 'Url is not valid'
      },
    },
    filename: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/**
 * implementar metodo propio con relaion a storage
 */
 StorageSchema.statics.findByAllData = function () {
  const findByAllData = this.find({});
  return findByAllData
};

/**
 * implementar metodo propio con relaion a storages para obtener un solo registro
 */
 StorageSchema.statics.findOneData = function (id) {
  const findOneData = this.findById(id);
  return findOneData
};

/**
 * implementar metodo propio para eliminar un registro
 */

StorageSchema.statics.deleteData = function (id) {
    const deleteData = this.findByIdAndRemove({_id: id},(error)=>{if(error){
      error}
    });
  return `Character with id ${ id } deleted from database`;
};


StorageSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Storage = mongoose.model("Storage", StorageSchema);

module.exports = Storage;
