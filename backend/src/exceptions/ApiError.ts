export class ApiError extends Error {
    status: number;
    errors: any;
  
    constructor(status: number, message: string, errors: any = []) {
      super(message)
      this.status = status;
      this.errors = errors;
    }
  
    static UnauthorizedErorr() {
      return new ApiError(401, 'User unauthorized')
    }
    static BadRequest(status: number, message: string, errors: any = []) {
      return new ApiError(400, message, errors)
    }
  }
  
  