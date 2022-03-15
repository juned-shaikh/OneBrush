import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {path: 'dashboard', title: 'Dashboard', icon: 'bx bx-home-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
   
    {path: 'user-management', title: 'User Management', icon: 'bx bxs-group', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
    
  {path: '', title: 'CMS', icon: 'bx bx-area', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
        { path: 'welcome-screen', title: 'Welcome Screen', icon: 'bx bx-chalkboard', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: 'screen-content', title: 'Screen Content', icon: 'bx bx-book-open', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    ]},
    {path: '', title: 'Dentinostic Dialogue', icon: 'bx bx-cctv', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
        { path: 'add-questions', title: 'Add Questions ', icon: 'bx bx-cctv', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    ]},
    {path: 'message', title: 'Message', icon: 'bx bx-comment-dots', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},

];   