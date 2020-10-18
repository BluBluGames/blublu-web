export class EmailTemplateGenerator
{
  private email: string;
  private message: string;
  /**
   *
   */
  constructor(email: string, message: string) {
    this.email = email;
    this.message = message;
  }

  getTemplate(): string {
    return this.generateTemplate()
  }

  private generateTemplate() {
    let template = 
    `
      BluBlu Games Contact request
      
      contact information:
        - email: ${this.email} 
      
      message:
      ${this.message}
    `
    return template;
  }
}