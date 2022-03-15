export class Links {

     public static BASE = 'http://36.255.3.15:8086/onebrush-api';
    //  public static BASE = 'http://192.168.0.131:8080';

    // public static BASE = 'http://localhost:8080/onebrush-api';
    // public static BASE = 'http://localhost:8080';

    public static LOGIN = Links.BASE + '/api/admin/adminLogin';
    public static DASHBOARD_COUNT = Links.BASE + '/admin/dashborad-count';
    public static CHANGE_PASSWORD = Links.BASE + '/admin/change-password';
    public static FORGOT_PASSWORD = Links.BASE + '/admin/forgot-password';
    public static RESET_PASSWORD = Links.BASE + '/admin/reset-password';
    public static VERIFY_RESET_PASSWORD_REQUEST = Links.BASE + '/admin/verify-reset-password-request';

    //USERS
    public static USER_LIST = Links.BASE + '/api/user/get_all_users_account';
    public static BLOCK_UNBLOCK_USER = Links.BASE + '/api/admin/block_user';
    public static UPDATE_USER_STATUS = Links.BASE + '/user/update-status';
    public static USER_RESET_PASSWORD = Links.BASE + '/user/reset-password';
    public static USER_VERIFY_REQUEST = Links.BASE + '/user/verify-request';
    public static GET_USER_DETAIL = Links.BASE +'/user/get-user';
    // public static USER_VERIFY_ACCOUNT_REQUEST = Links.BASE + '/user/verify-user-account';
    
    //WelcomeScreen
    public static ADD_WELCOME_SCREEN = Links.BASE + '/api/admin/add_welcome_carousel';
    public static  GET_WELCOME_SCREEN = Links.BASE + '/api/admin/get_welcome_carousel';
    public static  UPDATE_WELCOME_SCREEN = Links.BASE + '/api/admin/update_welcome_carousel';
    public static  DELETE_WELCOME_SCREEN = Links.BASE + '/api/admin/delete_welcome_carousel';

   
}
