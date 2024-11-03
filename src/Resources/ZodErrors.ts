import { ZodError, ZodIssue } from 'zod';

export const parseZodErrors = (issue: ZodIssue): string => {

    let message = '';
    console.log(issue);
    switch (issue.code)  {
      case 'invalid_type':
        message = `O campo '${issue.path[issue.path.length -1].toString()}' deve ser do tipo ${issue.expected} mas recebeu ${issue.received}.`;
        break;
      case 'too_small':
        message = `O campo '${issue.path.join('.')}' é muito pequeno.`;
        break;
      case 'too_big':
        message = `O campo '${issue.path.join('.')}' é muito grande.`;
        break;
      case 'invalid_enum_value':
        message = `O campo '${issue.path.join('.')}' deve ser um dos seguintes: `;
        break;
    //   case 'Required':
    //     message = `O campo '${issue.path.join('.')}' é obrigatório.`;
    //     break;
      default:
        message = `Campo '${issue.path.join('.')}', ${issue.message}.`;
    }

    return message;
};
