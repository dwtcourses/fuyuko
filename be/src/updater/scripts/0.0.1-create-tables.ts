import {Pool, PoolConnection} from "mariadb";
import {i} from '../../logger';
import {doInDbConnection} from "../../db";


export const update = async () => {
   i(`Inside ${__filename}, running update`);

   await TBL_INVITATION_REGISTRATION();
   await TBL_INVITATION_REGISTRATION_GROUPS();
   await TBL_SELF_REGISTRATION();
   await TBL_USER_THEME();
   await TBL_USER_DASHBOARD();
   await TBL_USER_DASHBOARD_WIDGET();
   await TBL_AUDIT_LOG();
   await TBL_GROUP();
   await TBL_USER();
   await TBL_GLOBAL_AVATAR();
   await TBL_USER_AVATAR();
   await TBL_LOOKUP_USER_GROUP();
   await TBL_ROLE();
   await TBL_LOOKUP_GROUP_ROLE();
   await TBL_PRICING_STRUCTURE();
   await TBL_LOOKUP_PRICING_STRUCTURE_GROUP();
   await TBL_PRICING_STRUCTURE_ITEM();
   await TBL_RULE();
   await TBL_RULE_VALIDATE_CLAUSE();
   await TBL_RULE_WHEN_CLAUSE();
   await TBL_VIEW();
   await TBL_ITEM();
   await TBL_ITEM_IMAGE();
   await TBL_ITEM_ATTRIBUTE();
   await TBL_ITEM_ATTRIBUTE_METADATA();
   await TBL_ITEM_ATTRIBUTE_METADATA_ENTRY();
   await TBL_ITEM_VALUE();
   await TBL_ITEM_VALUE_METADATA();
   await TBL_ITEM_VALUE_METADATA_ENTRY();
   await TBL_DATA_IMPORT();
   await TBL_DATA_IMPORT_FILE();
   await TBL_DATA_IMPORT_LOG();
   await TBL_DATA_IMPORT_ITEM();
   await TBL_DATA_IMPORT_ITEM_IMAGE();
   await TBL_DATA_IMPORT_ITEM_ATTRIBUTE();
   await TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA();
   await TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA_ENTRY();
   await TBL_DATA_IMPORT_ITEM_VALUE();
   await TBL_DATA_IMPORT_ITEM_VALUE_METADATA();
   await TBL_DATA_IMPORT_ITEM_VALUE_METADATA_ENTRY();
   await TBL_DATA_EXPORT();
   await TBL_DATA_EXPORT_FILE();
   await TBL_DATA_EXPORT_LOG();
   await TBL_DATA_EXPORT_ITEM();
   await TBL_DATA_EXPORT_ITEM_IMAGE();
   await TBL_DATA_EXPORT_ITEM_ATTRIBUTE();
   await TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA();
   await TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA_ENTRY();
   await TBL_DATA_EXPORT_ITEM_VALUE();
   await TBL_DATA_EXPORT_ITEM_VALUE_METADATA();
   await TBL_DATA_EXPORT_ITEM_VALUE_METADATA_ENTRY();
   await TBL_BULK_EDIT();
   await TBL_BULK_EDIT_LOG();
   await ADD_FK_CONSTRAINT();
   await ADD_INDEXES();

   i(`${__filename} done running update`);
};


const TBL_INVITATION_REGISTRATION = async () => {
   await doInDbConnection((conn: PoolConnection) => {
       conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_INVITATION_REGISTRATION (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            EMAIL VARCHAR(200) NOT NULL,
            CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CODE VARCHAR(200) NOT NULL,
            ACTIVATED BOOLEAN NOT NULL
         );
       `);
   });
}

const TBL_INVITATION_REGISTRATION_GROUPS = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_INVITATION_REGISTRATION_GROUP (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            INVITATION_REGISTRATION_ID INT,
            GROUP_ID INT 
         );
      `);
   });
};


const TBL_SELF_REGISTRATION = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_SELF_REGISTRATION (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            USERNAME VARCHAR(200) NOT NULL,
            EMAIL VARCHAR(200) NOT NULL,
            FIRSTNAME VARCHAR(200) NOT NULL,
            LASTNAME VARCHAR(200) NOT NULL,
            PASSWORD VARCHAR(200) NOT NULL,
            CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ACTIVATED BOOLEAN NOT NULL
         );
      `);
   });
}


const TBL_GROUP = async () => {
   // TBL_GROUP
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_GROUP (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL,
            STATUS VARCHAR(200) NOT NULL
         );
      `);
   });
};

const TBL_AUDIT_LOG = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_AUDIT_LOG (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            CATEGORY VARCHAR(200) NOT NULL,
            CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            LOG TEXT NOT NULL
         );
      `);
   })
}


const TBL_USER = async () => {
   // TBL_USER
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_USER (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            USERNAME VARCHAR(200) NOT NULL,
            CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            LAST_UPDATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            EMAIL VARCHAR(200) NOT NULL,
            FIRSTNAME VARCHAR(200) NOT NULL,
            LASTNAME VARCHAR(200) NOT NULL,
            STATUS VARCHAR(200) NOT NULL,
            PASSWORD VARCHAR(500) NOT NULL
         );
      `)
   });
};

const TBL_USER_THEME = async () => {
    await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_USER_THEME (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            USER_ID INT,
            THEME VARCHAR(200) NOT NULL 
         );
      `);
    });
};


const TBL_USER_DASHBOARD = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_USER_DASHBOARD (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            USER_ID INT,
            SERIALIZED_DATA TEXT NOT NULL
         );      
      `);
   });
};

const TBL_USER_DASHBOARD_WIDGET = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_USER_DASHBOARD_WIDGET (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            USER_DASHBOARD_ID INT,
            WIDGET VARCHAR(200) NOT NULL
         );
      `);
   });
};

const TBL_GLOBAL_AVATAR = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_GLOBAL_AVATAR (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            NAME VARCHAR(200) NOT NULL,
            MIME_TYPE VARCHAR(200) NOT NULL,
            SIZE INT NOT NULL,
            CONTENT BLOB NOT NULL
         );
      `);
   });
}

const TBL_USER_AVATAR = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_USER_AVATAR (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            USER_ID INT,
            GLOBAL_AVATAR_ID INT,
            MIME_TYPE VARCHAR(200),
            SIZE INT,
            CONTENT BLOB
         );
      `);
   });
};

const TBL_LOOKUP_USER_GROUP = async () => {
   // TBL_LOOKUP_USER_GROUP
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_LOOKUP_USER_GROUP (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            USER_ID INT NOT NULL,
            GROUP_ID INT NOT NULL
         );
      `);
   });
};

const TBL_ROLE = async () => {
   // TBL_ROLE
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ROLE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL
         );
      `);
   });
};

const TBL_LOOKUP_GROUP_ROLE = async () => {
   // TBL_LOOKUP_GROUP_ROLE
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_LOOKUP_GROUP_ROLE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            GROUP_ID INT NOT NULL,
            ROLE_ID INT NOT NULL
         );
      `);
   });

};

const TBL_PRICING_STRUCTURE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_PRICING_STRUCTURE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            VIEW_ID INT,
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL
          );  
      `);
   });
}


const TBL_LOOKUP_PRICING_STRUCTURE_GROUP = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_LOOKUP_PRICING_STRUCTURE_GROUP (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            PRICING_STRUCTURE_ID INT,
            GROUP_ID INT
         )
      `)
   });
}


const TBL_PRICING_STRUCTURE_ITEM = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_PRICING_STRUCTURE_ITEM (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            ITEM_ID INT,
            PRICING_STRUCTURE_ID INT,
            PRICE DECIMAL
         );
      `);
   });
}

const TBL_RULE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_RULE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            VIEW_ID INT,
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL
         );
      `)
   });
}

const TBL_RULE_VALIDATE_CLAUSE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_RULE_VALIDATE_CLAUSE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            RULE_ID INT,
            ITEM_ATTRIBUTE_ID INT,
            OPERATOR VARCHAR(200),
            \`CONDITION\` VARCHAR(200)
         );
      `);
   })
};

const TBL_RULE_WHEN_CLAUSE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_RULE_WHEN_CLAUSE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            RULE_ID INT,
            ITEM_ATTRIBUTE_ID INT,
            OPERATOR VARCHAR(200),
            \`CONDITION\` VARCHAR(200) 
         );
      `);
   });
};

const TBL_VIEW = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_VIEW (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL
         );
      `)
   });
};

const TBL_ITEM = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ITEM (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            PARENT_ID INT,
            VIEW_ID INT, 
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL
         );
      `)
   })
};

const TBL_ITEM_IMAGE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ITEM_IMAGE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            ITEM_ID INT,
            MIME_TYPE VARCHAR(200) NOT NULL,
            NAME VARCHAR(200) NOT NULL,
            SIZE INT NOT NULL,
            CONTENT BLOB NOT NULL 
         );
     `)
   })
};

const TBL_ITEM_ATTRIBUTE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ITEM_ATTRIBUTE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            ITEM_ID INT,
            ATTRIBUTE_METADATA_ID INT,
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL
         );
      `);
   });
};

const TBL_ITEM_ATTRIBUTE_METADATA = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ITEM_ATTRIBUTE_METADATA (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            ITEM_ATTRIBUTE_ID INT,
            NAME VARCHAR(200) NOT NULL 
         );
      `);
   });
};

const TBL_ITEM_ATTRIBUTE_METADATA_ENTRY = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ITEM_ATTRIBUTE_METADATA_ENTRY (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            ITEM_ATTRIBUTE_METADATA_ID INT,
            \`KEY\` VARCHAR(200) NOT NULL,
            VALUE VARCHAR(500) NOT NULL 
         );
      `);
   });
};

const TBL_ITEM_VALUE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ITEM_VALUE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            ITEM_ID INT,
            ITEM_ATTRIBUTE_ID INT
         );
      `);
   });
};

const TBL_ITEM_VALUE_METADATA = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_ITEM_VALUE_METADATA (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            ITEM_VALUE_ID INT,
            NAME VARCHAR(200) NOT NULL 
         );
      `);
   });
};


const TBL_ITEM_VALUE_METADATA_ENTRY = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
            CREATE TABLE IF NOT EXISTS TBL_ITEM_VALUE_METADATA_ENTRY (
               ID INT PRIMARY KEY AUTO_INCREMENT,
               ITEM_VALUE_METADATA_ID INT,
               \`KEY\` VARCHAR(200) NOT NULL,
               VALUE VARCHAR(500) NOT NULL 
            );
         `);
   });
};


const TBL_DATA_IMPORT = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            VIEW_ID INT NOT NULL,
            CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         );
      `);
   });
};

const TBL_DATA_IMPORT_FILE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_FILE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            DATA_IMPORT_ID INT,
            NAME VARCHAR(200) NOT NULL,
            MIME_TYPE VARCHAR(200) NOT NULL,
            SIZE INT NOT NULL,
            CONTENT BLOB NOT NULL 
         )
      `);
   });
}

const TBL_DATA_IMPORT_LOG = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_LOG (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            DATA_IMPORT_ID INT NOT NULL,
            CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            LEVEL VARCHAR(200) NOT NULL,
            LOG TEXT NOT NULL 
         );
      `);
   });
};

const TBL_DATA_IMPORT_ITEM = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE TBL_DATA_IMPORT_ITEM (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            DATA_IMPORT_ID INT,
            PARENT_ID INT,
            NAME VARCHAR(200),
            DESCRIPTION VARCHAR(500) 
         );
      `);
   });
};


const TBL_DATA_IMPORT_ITEM_IMAGE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_ITEM_IMAGE (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_IMPORT_ITEM_ID INT,
         MIME_TYPE VARCHAR(200) NOT NULL,
         NAME VARCHAR(200) NOT NULL,
         SIZE INT NOT NULL,
         CONTENT BLOB NOT NULL 
      );
  `)
   })
};

const TBL_DATA_IMPORT_ITEM_ATTRIBUTE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_ITEM_ATTRIBUTE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            DATA_IMPORT_ITEM_ID INT,
            ATTRIBUTE_METADATA_ID INT,
            NAME VARCHAR(200) NOT NULL,
            DESCRIPTION VARCHAR(500) NOT NULL
         );
      `);
   });
};


const TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_IMPORT_ITEM_ATTRIBUTE_ID INT,
         NAME VARCHAR(200) NOT NULL 
      );
   `);
   });
};

const TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA_ENTRY = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA_ENTRY (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_IMPORT_ITEM_ATTRIBUTE_METADATA_ID INT,
         \`KEY\` VARCHAR(200) NOT NULL,
         VALUE VARCHAR(500) NOT NULL 
      );
   `);
   });
};

const TBL_DATA_IMPORT_ITEM_VALUE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_ITEM_VALUE (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_IMPORT_ITEM_ID INT,
         ITEM_ATTRIBUTE_ID INT
      );
   `);
   });
};

const TBL_DATA_IMPORT_ITEM_VALUE_METADATA = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_ITEM_VALUE_METADATA (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_IMPORT_ITEM_VALUE_ID INT,
         NAME VARCHAR(200) NOT NULL 
      );
   `);
   });
};


const TBL_DATA_IMPORT_ITEM_VALUE_METADATA_ENTRY = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_DATA_IMPORT_ITEM_VALUE_METADATA_ENTRY (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            DATA_IMPORT_ITEM_VALUE_METADATA_ID INT,
            \`KEY\` VARCHAR(200) NOT NULL,
            VALUE VARCHAR(500) NOT NULL 
         );
      `);
   });
};


const TBL_DATA_EXPORT = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         VIEW_ID INT,
         CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
   `);
   });
};

const TBL_DATA_EXPORT_FILE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_FILE (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_EXPORT_ID INT,
         NAME VARCHAR(200),
         MIME_TYPE VARCHAR(200),
         SIZE INT,
         CONTENT BLOB 
      )
   `);
   });
}

const TBL_DATA_EXPORT_LOG = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_LOG (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_EXPORT_ID INT,
         CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         LEVEL VARCHAR(200) NOT NULL,
         LOG TEXT NOT NULL 
      );
   `);
   });
};

const TBL_DATA_EXPORT_ITEM = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE TBL_DATA_EXPORT_ITEM (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_EXPORT_ID INT,
         PARENT_ID INT,
         NAME VARCHAR(200),
         DESCRIPTION VARCHAR(500) 
      );
   `);
   });
};


const TBL_DATA_EXPORT_ITEM_IMAGE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_ITEM_IMAGE (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            DATA_EXPORT_ITEM_ID INT,
            MIME_TYPE VARCHAR(200) NOT NULL,
            NAME VARCHAR(200) NOT NULL,
            SIZE INT NOT NULL,
            CONTENT BLOB NOT NULL 
         );
   `)
   })
};

const TBL_DATA_EXPORT_ITEM_ATTRIBUTE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_ITEM_ATTRIBUTE (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_EXPORT_ITEM_ID INT,
         ATTRIBUTE_METADATA_ID INT,
         NAME VARCHAR(200) NOT NULL,
         DESCRIPTION VARCHAR(500) NOT NULL
      );
   `);
   });
};


const TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
   CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA (
      ID INT PRIMARY KEY AUTO_INCREMENT,
      DATA_EXPORT_ITEM_ATTRIBUTE_ID INT,
      NAME VARCHAR(200) NOT NULL 
   );
`);
   });
};

const TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA_ENTRY = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
   CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA_ENTRY (
      ID INT PRIMARY KEY AUTO_INCREMENT,
      DATA_EXPORT_ITEM_ATTRIBUTE_METADATA_ID INT,
      \`KEY\` VARCHAR(200) NOT NULL,
      VALUE VARCHAR(500) NOT NULL 
   );
`);
   });
};

const TBL_DATA_EXPORT_ITEM_VALUE = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
   CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_ITEM_VALUE (
      ID INT PRIMARY KEY AUTO_INCREMENT,
      DATA_EXPORT_ITEM_ID INT,
      ITEM_ATTRIBUTE_ID INT
   );
`);
   });
};

const TBL_DATA_EXPORT_ITEM_VALUE_METADATA = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
   CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_ITEM_VALUE_METADATA (
      ID INT PRIMARY KEY AUTO_INCREMENT,
      DATA_EXPORT_ITEM_VALUE_ID INT,
      NAME VARCHAR(200) NOT NULL 
   );
`);
   });
};


const TBL_DATA_EXPORT_ITEM_VALUE_METADATA_ENTRY = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
      CREATE TABLE IF NOT EXISTS TBL_DATA_EXPORT_ITEM_VALUE_METADATA_ENTRY (
         ID INT PRIMARY KEY AUTO_INCREMENT,
         DATA_EXPORT_ITEM_VALUE_METADATA_ID INT,
         \`KEY\` VARCHAR(200) NOT NULL,
         VALUE VARCHAR(500) NOT NULL 
      );
   `);
   });
};



const TBL_BULK_EDIT = async () => {
   await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_BULK_EDIT (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            NAME VARCHAR(200),
            DESCRIPTION VARCHAR(500)
         );
      `);
   });
};

const TBL_BULK_EDIT_LOG = async () => {
    await doInDbConnection((conn: PoolConnection) => {
      conn.query(`
         CREATE TABLE IF NOT EXISTS TBL_BULK_EDIT_LOG (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            BULK_EDIT_ID INT,
            CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            LEVEL VARCHAR(200) NOT NULL,
            LOG TEXT NOT NULL
         );
      `)
    });
};

const ADD_INDEXES = async () => {
   await doInDbConnection((conn: PoolConnection) => {
       // todo: querios Indexes
   });
};

const ADD_FK_CONSTRAINT = async () => {
   await doInDbConnection((conn: PoolConnection) => {

      conn.query('ALTER TABLE TBL_INVITATION_REGISTRATION_GROUP ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (INVITATION_REGISTRATION_ID) REFERENCES TBL_INVITATION_REGISTRATION(ID) ON DELETE CASCADE');
      conn.query('ALTER TABLE TBL_INVITATION_REGISTRATION_GROUP ADD CONSTRAINT  FOREIGN KEY IF NOT EXISTS (GROUP_ID) REFERENCES TBL_GROUP(ID)');

      conn.query(`ALTER TABLE TBL_USER_AVATAR ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (USER_ID) REFERENCES TBL_USER(ID)`);
      conn.query('ALTER TABLE TBL_USER_AVATAR ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (GLOBAL_AVATAR_ID) REFERENCES TBL_GLOBAL_AVATAR(ID)');

      conn.query(`ALTER TABLE TBL_USER_THEME ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (USER_ID) REFERENCES TBL_USER(ID)`);

      conn.query(`ALTER TABLE TBL_USER_DASHBOARD ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (USER_ID) REFERENCES TBL_USER(ID)`);

      conn.query(`ALTER TABLE TBL_USER_DASHBOARD_WIDGET ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (USER_DASHBOARD_ID) REFERENCES TBL_USER_DASHBOARD(ID)`);

      conn.query(`ALTER TABLE TBL_LOOKUP_GROUP_ROLE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (GROUP_ID) REFERENCES TBL_GROUP(ID)`);
      conn.query(`ALTER TABLE TBL_LOOKUP_GROUP_ROLE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ROLE_ID) REFERENCES TBL_ROLE(ID)`);

      conn.query(`ALTER TABLE TBL_LOOKUP_USER_GROUP ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (USER_ID) REFERENCES TBL_USER(ID)`);
      conn.query(`ALTER TABLE TBL_LOOKUP_USER_GROUP ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (GROUP_ID) REFERENCES  TBL_GROUP(ID)`);

      conn.query(`ALTER TABLE TBL_LOOKUP_PRICING_STRUCTURE_GROUP ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (PRICING_STRUCTURE_ID) REFERENCES TBL_PRICING_STRUCTURE(ID)`);
      conn.query(`ALTER TABLE TBL_LOOKUP_PRICING_STRUCTURE_GROUP ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (GROUP_ID) REFERENCES TBL_GROUP(ID)`);

      conn.query(`ALTER TABLE TBL_PRICING_STRUCTURE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (VIEW_ID) REFERENCES TBL_VIEW(ID)`);
      conn.query(`ALTER TABLE TBL_PRICING_STRUCTURE_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ID) REFERENCES TBL_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_PRICING_STRUCTURE_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (PRICING_STRUCTURE_ID) REFERENCES TBL_PRICING_STRUCTURE(ID)`);

      conn.query(`ALTER TABLE TBL_RULE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (VIEW_ID) REFERENCES TBL_VIEW(ID)`);
      conn.query(`ALTER TABLE TBL_RULE_VALIDATE_CLAUSE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (RULE_ID) REFERENCES TBL_RULE(ID)`);
      conn.query(`ALTER TABLE TBL_RULE_VALIDATE_CLAUSE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ATTRIBUTE_ID) REFERENCES TBL_ITEM_ATTRIBUTE(ID)`);
      conn.query(`ALTER TABLE TBL_RULE_WHEN_CLAUSE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (RULE_ID) REFERENCES TBL_RULE(ID)`);
      conn.query(`ALTER TABLE TBL_RULE_WHEN_CLAUSE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ATTRIBUTE_ID) REFERENCES TBL_ITEM_ATTRIBUTE(ID)`);
          
      conn.query(`ALTER TABLE TBL_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (PARENT_ID) REFERENCES TBL_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (VIEW_ID) REFERENCES TBL_VIEW(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_IMAGE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ID) REFERENCES TBL_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_ATTRIBUTE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ID) REFERENCES TBL_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_ATTRIBUTE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ATTRIBUTE_METADATA_ID) REFERENCES TBL_ITEM_ATTRIBUTE_METADATA(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_ATTRIBUTE_METADATA ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ATTRIBUTE_ID) REFERENCES TBL_ITEM_ATTRIBUTE(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_ATTRIBUTE_METADATA_ENTRY ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ATTRIBUTE_METADATA_ID) REFERENCES TBL_ITEM_ATTRIBUTE_METADATA(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_VALUE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ID) REFERENCES TBL_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_VALUE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ATTRIBUTE_ID) REFERENCES TBL_ITEM_ATTRIBUTE(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_VALUE_METADATA ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_VALUE_ID) REFERENCES TBL_ITEM_VALUE(ID)`);
      conn.query(`ALTER TABLE TBL_ITEM_VALUE_METADATA_ENTRY ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_VALUE_METADATA_ID) REFERENCES TBL_ITEM_VALUE_METADATA(ID)`);

      conn.query(`ALTER TABLE TBL_DATA_IMPORT ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (VIEW_ID) REFERENCES TBL_VIEW(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_FILE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ID) REFERENCES TBL_DATA_IMPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_LOG ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ID) REFERENCES TBL_DATA_IMPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ID) REFERENCES TBL_DATA_IMPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (PARENT_ID) REFERENCES TBL_DATA_IMPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_IMAGE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_ID) REFERENCES TBL_DATA_IMPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_LOG ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ID) REFERENCES TBL_DATA_IMPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ID) REFERENCES TBL_DATA_IMPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (PARENT_ID) REFERENCES TBL_DATA_IMPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_IMAGE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_ID) REFERENCES TBL_DATA_IMPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_ATTRIBUTE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_ID) REFERENCES TBL_DATA_IMPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_ATTRIBUTE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ATTRIBUTE_METADATA_ID) REFERENCES TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_ATTRIBUTE_ID) REFERENCES TBL_DATA_IMPORT_ITEM_ATTRIBUTE(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA_ENTRY ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_ATTRIBUTE_METADATA_ID) REFERENCES TBL_DATA_IMPORT_ITEM_ATTRIBUTE_METADATA(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_VALUE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_ID) REFERENCES TBL_DATA_IMPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_VALUE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ATTRIBUTE_ID) REFERENCES TBL_DATA_IMPORT_ITEM_ATTRIBUTE(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_VALUE_METADATA ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_VALUE_ID) REFERENCES TBL_DATA_IMPORT_ITEM_VALUE(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_IMPORT_ITEM_VALUE_METADATA_ENTRY ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_IMPORT_ITEM_VALUE_METADATA_ID) REFERENCES TBL_DATA_IMPORT_ITEM_VALUE_METADATA(ID)`);

      conn.query(`ALTER TABLE TBL_DATA_EXPORT ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (VIEW_ID) REFERENCES TBL_VIEW(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_FILE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ID) REFERENCES TBL_DATA_EXPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_LOG ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ID) REFERENCES TBL_DATA_EXPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ID) REFERENCES TBL_DATA_EXPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (PARENT_ID) REFERENCES TBL_DATA_EXPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_IMAGE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_ID) REFERENCES TBL_DATA_EXPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_LOG ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ID) REFERENCES TBL_DATA_EXPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ID) REFERENCES TBL_DATA_EXPORT(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (PARENT_ID) REFERENCES TBL_DATA_EXPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_IMAGE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_ID) REFERENCES TBL_DATA_EXPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_ATTRIBUTE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_ID) REFERENCES TBL_DATA_EXPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_ATTRIBUTE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ATTRIBUTE_METADATA_ID) REFERENCES TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_ATTRIBUTE_ID) REFERENCES TBL_DATA_EXPORT_ITEM_ATTRIBUTE(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA_ENTRY ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_ATTRIBUTE_METADATA_ID) REFERENCES TBL_DATA_EXPORT_ITEM_ATTRIBUTE_METADATA(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_VALUE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_ID) REFERENCES TBL_DATA_EXPORT_ITEM(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_VALUE ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (ITEM_ATTRIBUTE_ID) REFERENCES TBL_DATA_EXPORT_ITEM_ATTRIBUTE(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_VALUE_METADATA ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_VALUE_ID) REFERENCES TBL_DATA_EXPORT_ITEM_VALUE(ID)`);
      conn.query(`ALTER TABLE TBL_DATA_EXPORT_ITEM_VALUE_METADATA_ENTRY ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (DATA_EXPORT_ITEM_VALUE_METADATA_ID) REFERENCES TBL_DATA_EXPORT_ITEM_VALUE_METADATA(ID)`);

      conn.query(`ALTER TABLE TBL_BULK_EDIT_LOG ADD CONSTRAINT FOREIGN KEY IF NOT EXISTS (BULK_EDIT_ID) REFERENCES TBL_BULK_EDIT(ID)`);
   });
}




