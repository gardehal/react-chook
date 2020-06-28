import { getNow } from "../resources/Shared";

export class Source 
{
    id: String;
    name: String;
    link_01: String;
    link_02: String;
    comment: String;
    regby: String;
    regtime: String;
    modby: String;
    modtime: String;

    constructor(id: String, name: String, link_01: String, link_02: String, comment: String, regby: String, modby: String) 
    {
      this.id = id;
      this.name = name;
      this.link_01 = link_01;
      this.link_02 = link_02;
      this.comment = comment;
      this.regby = regby;
      this.regtime = getNow(true);
      this.modby = modby;
      this.modtime = getNow(true);
    }
  }