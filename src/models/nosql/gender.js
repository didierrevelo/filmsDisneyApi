const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const GenderSchema = new mongoose.Schema(
  {
      Name: {
        type: String,
        allowNull: false
      },
      Movie: {
        type: String,
        allowNull: false
      },
      mediaId: {
        type: mongoose.Types.ObjectId,
      },
    },
    {
      timestamps: true,
      versionKey: false
    }
);

/**
 * implementar metodo propio con relaion a storage
  */
GenderSchema.statics.findByAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'Imagen'
      },
    }
  ]);
  return joinData
};

/**
 * implementar metodo propio con relaion a storages para obtener un solo registro
 */
 GenderSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'Imagen'
      },
    },
    {
      $unwind: "$Imagen",
    }
  ]);
  return joinData
};

/**
 * implementar metodo propio para eliminar un registro
 */

 GenderSchema.statics.deleteData = function (id) {
  const deleteData = this.findByIdAndRemove({_id: id},(error)=>{if(error){
    error}
  });
return `Character with id ${ id } deleted from database`;
};

/**
* implementar metodo propio para actualizar un registro
*/
GenderSchema.statics.updateData = function (id, data) {
const updateData = this.findByIdAndUpdate({_id: id}, data, (error)=>{if(error){
  error
}
});
return `Character with id ${ id } updated from database`;
};

GenderSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Gender = mongoose.model("Gender", GenderSchema);

module.exports = Gender;
