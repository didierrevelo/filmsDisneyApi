const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const CharacterSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      allowNull: false
    },
    Age: {
      type: Number,
      allowNull: false
    },
    Weight: {
      type: Number,
      allowNull: false
    },
    History: {
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
CharacterSchema.statics.findByAllData = function () {
  const joinData = this.aggregate([
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
 * implementar metodo propio con relaion a storages para obtener un solo registro
 */
 CharacterSchema.statics.findOneData = function (id) {
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

CharacterSchema.statics.deleteData = function (id) {
    const deleteData = this.findByIdAndRemove({_id: id},(error)=>{if(error){
      error}
    });
    const dataDeleted = this.findOneData(id);
  return (dataDeleted);
};

/**
 * implementar metodo propio para actualizar un registro
 */
CharacterSchema.statics.updateData = function (id, data) {
  const updateData = this.findByIdAndUpdate({_id: id}, data, (error)=>{if(error){
    error
  }
  });
  const dataUpdated = this.findOneData(id);
  return (dataUpdated);
};

CharacterSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Characters = mongoose.model("Characters", CharacterSchema);

module.exports = Characters;
