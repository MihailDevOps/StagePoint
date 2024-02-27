export const MailValidation = (mail: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!mail) {
        return'Email required'
    }else if (!re.test(String(mail).toLowerCase())) {
        return 'Input valid email';
    } else 
      return ''
}