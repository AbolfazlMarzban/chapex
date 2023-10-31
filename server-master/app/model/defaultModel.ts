import Model from "./Model";
import pageSaleUpdateModel from "./shop/pageSaleModels/pageSaleUpdateModel";
import path from "path";

class UserModel extends Model {
  constructor() {
    super();
  }

  async get(Id = "0", state) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("Year", this.sql.Int, global.config.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.Int, Id)
        .execute("USP_TDefault_Select");
      if (state == "Detail_TDefault") {
        return result.recordset;
      } else if (state == "MainGroup_TDefault") {
        return result.recordset[0];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll(Id = 0, state) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("Year", this.sql.Int, global.config.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.Int, Id)
        .execute("USP_TDefault_Select");

      if (state == "Detail_TDefault") {
        var res = await result.recordset;

        for (var i = 0; i <= res.length - 1; i++) {
          res[i].children = await this.findByGroupId(Number(res[i].TD_FID))
        }

        return res;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async findDefaultsByCodeId(codeIds = null, level = 2) {
    try {
      let results = [];
      for (let codeId of codeIds) {
        const result = await this.Database.request()
          .input("State", this.sql.NVarChar, "MainGroup_TDefault")
          .input("Year", this.sql.Int, global.config.YEAR_ACCOUNTING)
          .input("FID_Group", this.sql.Int, codeId)
          .execute("USP_TDefault_Select");
        let masterGruop = result.recordset[0];
        masterGruop.children = [];
        let children = await this.getDefaultsChildren(codeId);
        masterGruop.children = children;
        results.push(masterGruop);
      }
      return results;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async findDefaultsByCode(codeIds = null, level = 2) {
    try {
      let results = [];
      for (let codeId of codeIds) {
        const result = await this.Database.request()
          .input("State", this.sql.NVarChar, "MainGroup_TDefault")
          .input("Year", this.sql.Int, global.config.YEAR_ACCOUNTING)
          .input("FID_Group", this.sql.Int, codeId)
          .execute("USP_TDefault_Select");
        let masterGruop = result.recordset[0];
        masterGruop.children = [];
        let children = await this.getDefaultsChildren(codeId);
        masterGruop.children = children;
        results.push(masterGruop);
      }
      return results;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async findByGroupId(groupId = 0) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "Combo_TDefault")
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.Int, groupId)
        .execute("USP_TDefault_Select");

      // console.log(result.recordsets[0]);

      return result.recordsets[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findParentId(nodeId = 0) {
    const sqlQuery = ` select TD_FID_Group from TDefault where TD_FID=${nodeId}`

    const result = await this.Database.request().query(sqlQuery)
    if (result.recordset.length > 0) {
      return result.recordset[0].TD_FID_Group
    }
  }

  async getBreadcrumbNode(nodeId, disabled) {
    let ret = []

    let node = await this.findById(nodeId)
    ret.push({
      text: node.TD_FName,
      disabled: disabled,
      href: '/admin/defaults/' + nodeId,
    })

    if (node.TD_FID_Group > 0) {
      const parent = await this.getBreadcrumbNode(node.TD_FID_Group, false)

      parent.forEach(pr => ret.push(pr))
    }

    return ret
  }

  async initBreadcrumb(nodeId = 0) {
    let ret = []

    if (nodeId > 0) {
      ret = await this.getBreadcrumbNode(nodeId, true)
      ret = ret.reverse()
    }

    ret.splice(0, 0, {
      text: 'تعاریف پایه',
      disabled: (nodeId == 0),
      href: '/admin/defaults/',
    })

    return ret
  }

  async getDefaultsChildren(groupId = 0) {
    try {
      let results = [];
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "Combo_TDefault")
        .input("Year", this.sql.Int, global.config.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.Int, groupId)
        .execute("USP_TDefault_Select");
      return result.recordsets[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getOptionsChildren(groupId = 220) {
    try {
      let results = [];
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "Combo_TDefault_GoodsOption")
        .input("Year", this.sql.Int, global.config.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.Int, groupId)
        .execute("USP_TDefault_Select");
      return result.recordsets[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  deleteFaq(parentID, id) {
    return `DELETE FROM [dbo].[TFAQ] WHERE [TFAQ_FID_Parent] = ${parentID} AND [TFAQ_FID] = ${id}`
  }
  insOrUpdateFaq(parentID, id, question, answer) {
    return `UPDATE [dbo].[TFAQ] SET [TFAQ_FQuestion] = '${question}', [TFAQ_FAnswer] = '${answer}'
     WHERE [TFAQ_FID] = ${id} AND [TFAQ_FID_Parent] = ${parentID}
     
     IF @@ROWCOUNT = 0

     INSERT INTO [dbo].[TFAQ]([TFAQ_FID_Parent], [TFAQ_FType], [TFAQ_FQuestion], [TFAQ_FAnswer])
     VALUES(${parentID}, 'salePageCategory', '${question}', '${answer}')
     `
  }
  async save(data, User, state = "Insert") {
    try {
      if (data.gallery && data.gallery.length > 0) {
        await pageSaleUpdateModel.update_gallery(data, User)
      }
      if (data.FAQ && data.FAQ.length > 0) {
        var error_result = {
          output: {
            status: 422,
            error: true,
            RetMsg: "عملیات با خطا مواجه شد",
          }
        }
        var faqQuery = ''
        for (var i = 0; i < data.FAQ.length; i++) {
          if (data.FAQ[i].TFAQ_FDELETE == 1) {
            faqQuery += this.deleteFaq(data.TD_FID, data.FAQ[i].TFAQ_FID)
          } else {
            faqQuery += this.insOrUpdateFaq(data.TD_FID, data.FAQ[i].TFAQ_FID, data.FAQ[i].TFAQ_FQuestion, data.FAQ[i].TFAQ_FAnswer)
          }
        }
        const res = await this.Database.request().query(faqQuery)
        if (res) {
          //   var obj = {
          //     output: {
          //         RetID: 1,
          //         RetMsg: "ویرایش با موفقیت انجام شد",
          //     }
          // }
          // return obj;
        } else {
          return error_result;
        }
      }

      let RetID;
      let ReturnFID;
      let RetMsg;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("User", this.sql.BigInt, User)
        .input("TD_FID", this.sql.Int, data.TD_FID)
        .input("TD_FCode", this.sql.Int, data.TD_FCode)
        .input("TD_FName", this.sql.NVarChar, data.TD_FName)
        .input("TD_FCaption", this.sql.NVarChar, data.TD_FCaption)
        .input("TD_FComment", this.sql.NVarChar, data.TD_FComment)
        .input("TD_FValue1", this.sql.Money, data.TD_FValue1)
        .input("TD_FValue2", this.sql.Money, data.TD_FValue2)
        .input("TD_FValue3", this.sql.Money, data.TD_FValue3)
        .input("TD_FValue4", this.sql.NVarChar, data.TD_FValue4)
        .input("TD_FOrder", this.sql.Int, data.TD_FOrder)
        .input("TD_FActive", this.sql.TinyInt, data.TD_FActive)
        .input("TD_FShow", this.sql.TinyInt, data.TD_FShow)
        .input("TD_FSystem", this.sql.TinyInt, data.TD_FSystem)
        .input("TD_FDelete", this.sql.TinyInt, data.TD_FDelete)
        .input("TD_FFormType", this.sql.TinyInt, data.TD_FFormType)
        .input("TD_FSubGroup", this.sql.TinyInt, data.TD_FSubGroup)
        .input("TD_FID_Group", this.sql.Int, data.TD_FID_Group)
        .input("TD_FDeleted", this.sql.TinyInt, data.TD_FDeleted)
        .input("TD_FEdited", this.sql.TinyInt, data.TD_FEdited)
        .input("TD_FInserted", this.sql.TinyInt, data.TD_FInserted)
        .input("TD_FDateReg", this.sql.NVarChar, data.TD_FDateReg)
        .input("TD_FYear", this.sql.Int, data.TD_FYear)
        .input("TD_FUserReg", this.sql.BigInt, data.TD_FUserReg)
        .input("saleid", this.sql.BigInt, data.saleid)

        .output("RetID", this.sql.BigInt, RetID)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TDefault_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id) {
    try {
      let RetID;
      let RetMsg;

      const result = await this.Database.request()
        .input("FID", this.sql.BigInt, id)
        .input("TableName", this.sql.NVarChar, "TDefault")
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TDefault_Del");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findById(id) {
    try {
      let results = [];
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "MainGroup_TDefault")
        .input("Year", this.sql.Int, global.config.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.BigInt, id)
        .execute("USP_TDefault_Select");
      return result.recordset[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getGallery(id) {
    try {
      const query = `SELECT * FROM [V_TPicture] WHERE TPIC_FForm='salePageCategory' and TPIC_FID_Parent=${id}
      order by TPIC_FOrder asc`
      const result = await this.Database.request().query(query)
      // console.log('gallery', result)

      if (result.recordset.length > 0) {
        // console.log('gallery', result)
        result.recordset.forEach(p => {
          if (p && p.TPIC_FAddress && p.TPIC_FName) {
            p.TPIC_FName = p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf('.'));
            p.path = path.normalize(p.TPIC_FAddress);
            p.thumbnail_path = path.normalize(path.join(path.dirname(p.TPIC_FAddress), 'sm-' + p.TPIC_FName));
          }
        })
        return result.recordset
      }
    } catch (error) {
      console.log(error)
    }
  }
  async findByFLink(id) {
    try {
      const fQuery = `SELECT * FROM [V_TDefault] WHERE [TD_FCaption] = '${id}'`
      const result = await this.Database.request().query(fQuery)
      if (result.recordset.length > 0) {
        return result.recordset
      }
    } catch (error) {
      console.log(error)
    }
  }
  async getFAQ(id) {
    try {
      var getFaqQuery = `SELECt * FROM [dbo].[TFAQ] WHERE [TFAQ_FID_Parent] = ${id}`
      const result = await this.Database.request().query(getFaqQuery)
      if (result) {
        return result.recordset
      }
    } catch (error) {
      console.log(error)
    }
  }
  // async update(data, User) {
  //   try {
  //     let RetID;
  //     let RetMsg;

  //     const result = await this.Database.request()
  //       .input("State", this.sql.NVarChar, "Update")
  //       .input("TD_FID", this.sql.Int, data.TD_FID)
  //       .input("TD_FCode", this.sql.Int, data.TD_FCode)
  //       .input("TD_FName", this.sql.NVarChar, data.TD_FName)
  //       .input("TD_FCaption", this.sql.NVarChar, data.TD_FCaption)
  //       .input("TD_FComment", this.sql.NVarChar, data.TD_FComment)
  //       .input("TD_FValue1", this.sql.Money, data.TD_FValue1)
  //       .input("TD_FValue2", this.sql.Money, data.TD_FValue2)
  //       .input("TD_FValue3", this.sql.Money, data.TD_FValue3)
  //       .input("TD_FValue4", this.sql.NVarChar, data.TD_FValue4)
  //       .input("TD_FOrder", this.sql.Int, data.TD_FOrder)
  //       .input("TD_FActive", this.sql.TinyInt, data.TD_FActive)
  //       .input("TD_FShow", this.sql.TinyInt, data.TD_FShow)
  //       .input("TD_FSystem", this.sql.TinyInt, data.TD_FSystem)
  //       .input("TD_FDelete", this.sql.TinyInt, data.TD_FDelete)
  //       .input("TD_FFormType", this.sql.TinyInt, data.TD_FFormType)
  //       .input("TD_FSubGroup", this.sql.TinyInt, data.TD_FSubGroup)
  //       .input("TD_FID_Group", this.sql.Int, data.TD_FID_Group)
  //       .input("TD_FDeleted", this.sql.TinyInt, data.TD_FDeleted)
  //       .input("TD_FEdited", this.sql.TinyInt, data.TD_FEdited)
  //       .input("TD_FInserted", this.sql.TinyInt, data.TD_FInserted)
  //       .input("TD_FDateReg", this.sql.NVarChar, data.TD_FDateReg)
  //       .input("TD_FYear", this.sql.Int, data.TD_FYear)
  //       .input("TD_FUserReg", this.sql.BigInt, data.TD_FUserReg)
  //       .input("User", this.sql.BigInt, User)

  //       .output("RetID", this.sql.BigInt, RetID)
  //       .output("RetMsg", this.sql.NVarChar, RetMsg)
  //       .execute("USP_TDefault_Ins");
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
}

export default new UserModel();
