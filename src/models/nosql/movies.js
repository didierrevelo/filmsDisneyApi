const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


const MovieSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      allowNull: false
    },
    Date: {
      type: Date,
      allowNull: false
    },
    Score: {
      type: Number,
      allowNull: false
    },
    associated_characters: {
      type: Array,
      allowNull: false
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
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
 MovieSchema.statics.findByAllData = function () {
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
 MovieSchema.statics.findOneData = function (id) {
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

MovieSchema.statics.deleteData = function (id) {
    const deleteData = this.findByIdAndRemove({_id: id},(error)=>{if(error){
      error}
    });
  return `Character with id ${ id } deleted from database`;
};

/**
 * implementar metodo propio para actualizar un registro
 */
MovieSchema.statics.updateData = function (id, data) {
  const updateData = this.findByIdAndUpdate({_id: id}, data, (error)=>{if(error){
    error
  }
  });
  return `Character with id ${ id } updated from database`;
};


MovieSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Movies = mongoose.model('Movies', MovieSchema);

module.exports = Movies;
