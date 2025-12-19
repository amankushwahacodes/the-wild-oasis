import supabase, { supabaseUrl } from "./supabase";

export async function getCabins (){

const { data, error } = await supabase
  .from('cabins')
  .select('*')

  if(error){
   
    throw new Error("Cabins could not be loaded")
  }

  return data;
}

export async function createEditCabin(newCabin,id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/',"");

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}//storage/v1/object/public/cabin-images/${imageName}`


  // create/edit cabin
  let query = supabase.from('cabins')

// create
  if(!id) query = query.insert([
    {...newCabin , image : imagePath}
  ])

  // edit
  if(id) query = query.update( {...newCabin , image : imagePath})
  .eq('id', id)
  .select()
  

  const {data ,error } = await query.select().single();

  if(error){
   
    throw new Error("Cabin could not be created")
  }

  if(hasImagePath) return data;
  // upload image 
const { error : storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)


  // delete the cabin if there was error 
  if(storageError ){
    await supabase
  .from('cabins')
  .delete()
  .eq('id', data.id)
 
    throw new Error("Cabin image could not be uploaded and cabin was not created")
  }

  return data;

}

export async function deleteCabin(id){
  
const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if(error){
   
    throw new Error("Cabins could not be deleted")
  }

  return null;

}