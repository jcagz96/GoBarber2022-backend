import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";
import handlebars from 'handlebars';

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }

}
