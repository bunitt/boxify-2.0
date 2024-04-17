### the code of Boxify 2.0
simple note app coded on vue and directus (database), designed with tailwind, much cleaner and more readable code (no new features compared to the old version)

database structure (you need this to open up the project): 
TABLE: box 
  
  fields: 
  - id,
  - boxTitle (String),
  - boxType (int),
  - isEditing (int)
TABLE: item

  fields: 
  - id,
  - itemName (String),
  - boxId (int),
  - isCharacterize (int),
  - col (int)

local database on port 8055
