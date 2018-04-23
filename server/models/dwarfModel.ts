import * as mongoose from 'mongoose';

const dwarfSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
});

const dwarfModel = mongoose.model('dwarf', dwarfSchema);

export default dwarfModel;
