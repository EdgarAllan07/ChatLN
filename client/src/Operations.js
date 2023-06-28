import React from "react";
import "./index.scss";

function Operations() {
    return (
        <div class="app-right">
            <div class="app-profile-box">
                <img src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" alt="profile" />
                <p class="app-profile-box-title name"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>Dwight Scrute</p>
                <p class="app-profile-box-title mail"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>dwightscrute@test.com</p>
                <button class="archive-btn">Archive<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-archive" viewBox="0 0 24 24">
                    <defs />
                    <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
                </svg></button>
            </div>
            <div class="app-activity-box">
                <div class="activity-info-boxes">
                    <div class="activity-info-box time">
                        <div class="info-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-clock" viewBox="0 0 24 24">
                                <defs />
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <div class="info-text-wrapper">
                            <span class="info-text-upper">13h</span>
                            <span class="info-text-bottom">Time</span>
                        </div>
                    </div>
                    <div class="activity-info-box atendee">
                        <div class="info-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-users" viewBox="0 0 24 24">
                                <defs />
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                            </svg>
                        </div>
                        <div class="info-text-wrapper">
                            <span class="info-text-upper">32</span>
                            <span class="info-text-bottom">Atendeed</span>
                        </div>
                    </div>
                    <div class="activity-info-box meeting">
                        <div class="info-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-calendar" viewBox="0 0 24 24">
                                <defs />
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        </div>
                        <div class="info-text-wrapper">
                            <span class="info-text-upper">122</span>
                            <span class="info-text-bottom">Meetings</span>
                        </div>
                    </div>
                    <div class="activity-info-box reject">
                        <div class="info-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-x-square" viewBox="0 0 24 24">
                                <defs />
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                <path d="M9 9l6 6M15 9l-6 6" />
                            </svg>
                        </div>
                        <div class="info-text-wrapper">
                            <span class="info-text-upper">12</span>
                            <span class="info-text-bottom">Rejected</span>
                        </div>
                    </div>
                </div>
                <div class="activity-info-header">
                    <span class=
                        "info-header-bold">Current Week</span>
                    <span class=
                        "info-header-light">Activity</span>
                </div>
                <div class="activity-days-wrapper">
                    <div class="day">
                        <div class="chart"></div>
                        <span>MON</span>
                    </div>
                    <div class="day">
                        <div class="chart"></div>
                        <span>TUE</span>
                    </div>
                    <div class="day current">
                        <div class="chart"></div>
                        <span>WED</span>
                    </div>
                    <div class="day">
                        <div class="chart"></div>
                        <span>THU</span>
                    </div>
                    <div class="day">
                        <div class="chart"></div>
                        <span>FRI</span>
                    </div>
                    <div class="day">
                        <div class="chart"></div>
                        <span>SAT</span>
                    </div>
                    <div class="day">
                        <div class="chart"></div>
                        <span>SUN</span>
                    </div>
                </div>
            </div>
            <div class="app-right-bottom">
                <div class="app-theme-selector">
                    <button class="theme-color indigo" data-color="indigo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" title="Indigo">
                            <defs />
                            <path fill="#fff" d="M451.648.356c-25.777 2.712-56.79 19.872-94.811 52.46-68.786 58.958-149.927 160.756-202.185 234-38.158-5.951-78.375 10.368-102.187 40.133C8.758 381.584 45.347 430.34 4.12 473.811c-7.179 7.569-4.618 20.005 4.98 24.114 67.447 28.876 153.664 10.879 194.109-31.768 24.718-26.063 38.167-64.54 31.411-100.762 72.281-55.462 172.147-140.956 228.7-211.885 31.316-39.277 47.208-70.872 48.584-96.59C513.759 22.273 486.87-3.346 451.648.356zM181.443 445.511c-27.362 28.85-87.899 45.654-141.767 31.287 30.12-48.043 4.229-91.124 36.214-131.106 26.246-32.808 79.034-41.993 109.709-11.317 35.839 35.843 19.145 86.566-4.156 111.136zm3.07-148.841c7.354-10.167 18.887-25.865 33.29-44.659l49.22 49.224c-18.125 14.906-33.263 26.86-43.077 34.494-8.842-15.879-22.526-30.108-39.433-39.059zM481.948 55.316c-3.368 63.004-143.842 186.021-191.797 226.621l-53.785-53.79c39.458-49.96 155.261-191.312 218.422-197.954 16.851-1.775 28.03 8.858 27.16 25.123z" />
                        </svg>
                    </button>
                    <button class="theme-color pink" data-color="pink" title="Pink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" >
                            <defs />
                            <path fill="#fff" d="M451.648.356c-25.777 2.712-56.79 19.872-94.811 52.46-68.786 58.958-149.927 160.756-202.185 234-38.158-5.951-78.375 10.368-102.187 40.133C8.758 381.584 45.347 430.34 4.12 473.811c-7.179 7.569-4.618 20.005 4.98 24.114 67.447 28.876 153.664 10.879 194.109-31.768 24.718-26.063 38.167-64.54 31.411-100.762 72.281-55.462 172.147-140.956 228.7-211.885 31.316-39.277 47.208-70.872 48.584-96.59C513.759 22.273 486.87-3.346 451.648.356zM181.443 445.511c-27.362 28.85-87.899 45.654-141.767 31.287 30.12-48.043 4.229-91.124 36.214-131.106 26.246-32.808 79.034-41.993 109.709-11.317 35.839 35.843 19.145 86.566-4.156 111.136zm3.07-148.841c7.354-10.167 18.887-25.865 33.29-44.659l49.22 49.224c-18.125 14.906-33.263 26.86-43.077 34.494-8.842-15.879-22.526-30.108-39.433-39.059zM481.948 55.316c-3.368 63.004-143.842 186.021-191.797 226.621l-53.785-53.79c39.458-49.96 155.261-191.312 218.422-197.954 16.851-1.775 28.03 8.858 27.16 25.123z" />
                        </svg>
                    </button>
                    <button class="theme-color navy-dark active" data-color="navy-dark" title="Navy Dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                            <defs />
                            <path fill="#fff" d="M451.648.356c-25.777 2.712-56.79 19.872-94.811 52.46-68.786 58.958-149.927 160.756-202.185 234-38.158-5.951-78.375 10.368-102.187 40.133C8.758 381.584 45.347 430.34 4.12 473.811c-7.179 7.569-4.618 20.005 4.98 24.114 67.447 28.876 153.664 10.879 194.109-31.768 24.718-26.063 38.167-64.54 31.411-100.762 72.281-55.462 172.147-140.956 228.7-211.885 31.316-39.277 47.208-70.872 48.584-96.59C513.759 22.273 486.87-3.346 451.648.356zM181.443 445.511c-27.362 28.85-87.899 45.654-141.767 31.287 30.12-48.043 4.229-91.124 36.214-131.106 26.246-32.808 79.034-41.993 109.709-11.317 35.839 35.843 19.145 86.566-4.156 111.136zm3.07-148.841c7.354-10.167 18.887-25.865 33.29-44.659l49.22 49.224c-18.125 14.906-33.263 26.86-43.077 34.494-8.842-15.879-22.526-30.108-39.433-39.059zM481.948 55.316c-3.368 63.004-143.842 186.021-191.797 226.621l-53.785-53.79c39.458-49.96 155.261-191.312 218.422-197.954 16.851-1.775 28.03 8.858 27.16 25.123z" />
                        </svg>
                    </button>
                    <button class="theme-color dark" data-color="dark" title="Dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                            <defs />
                            <path fill="currentColor" d="M451.648.356c-25.777 2.712-56.79 19.872-94.811 52.46-68.786 58.958-149.927 160.756-202.185 234-38.158-5.951-78.375 10.368-102.187 40.133C8.758 381.584 45.347 430.34 4.12 473.811c-7.179 7.569-4.618 20.005 4.98 24.114 67.447 28.876 153.664 10.879 194.109-31.768 24.718-26.063 38.167-64.54 31.411-100.762 72.281-55.462 172.147-140.956 228.7-211.885 31.316-39.277 47.208-70.872 48.584-96.59C513.759 22.273 486.87-3.346 451.648.356zM181.443 445.511c-27.362 28.85-87.899 45.654-141.767 31.287 30.12-48.043 4.229-91.124 36.214-131.106 26.246-32.808 79.034-41.993 109.709-11.317 35.839 35.843 19.145 86.566-4.156 111.136zm3.07-148.841c7.354-10.167 18.887-25.865 33.29-44.659l49.22 49.224c-18.125 14.906-33.263 26.86-43.077 34.494-8.842-15.879-22.526-30.108-39.433-39.059zM481.948 55.316c-3.368 63.004-143.842 186.021-191.797 226.621l-53.785-53.79c39.458-49.96 155.261-191.312 218.422-197.954 16.851-1.775 28.03 8.858 27.16 25.123z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Operations;
