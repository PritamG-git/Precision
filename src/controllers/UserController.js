import { showMessage } from "react-native-flash-message";
import { HttpClient } from "./HttpClient";

export class UserController {

  static async login(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "users/login";
        const body = data;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async register(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "users/create";
        const body = data;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async uploadImage(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "user_photos/upload";
        const body = data;
        HttpClient.post(endpoint, body, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          }
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async placeName() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "site";
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async getRoles() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "designation";

        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async updateshift(data, id) {
    return new Promise((resolve, reject) => {
      const endpoint = "shifts/update/" + id;
      console.log(endpoint)
      const body = data;
      HttpClient.patch(endpoint, body)
        .then((response) => {
          console.log("res updateshift values", response);
          resolve(response);
          showMessage({
            message: "Successfully updated shift details",
            type: "success",
          });
        })
        .catch((error) => {
          alert(error.msg)
          console.log("error of updateshift", error);
          // reject(new Error(error));
        });
    });
  }


  static async allshiftsapi() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "shifts";

        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async updateProfileRequesttt(data, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "user_profiles/" + id;
        const body = data;
        HttpClient.patch(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async GetOtPRequestt(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "users/verify-otp";
        const body = data;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
            {
              showMessage({
                message: error.msg,
                type: "danger",
              });
            }
          });
      }, 500)
    });
  }

  static async GetOtPresendRequestt(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "users/resend-otp";
        const body = data;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async addCertificate(data) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const endpoint = "user_documents/upload";
        HttpClient.post(endpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          }
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500);
    });
  }

  static async getCertificates() {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const endpoint = "user_documents/all";
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500);
    });
  }

  static async deleteCertificate(id) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const endpoint = "user_documents/" + id;
        HttpClient.delete(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500);
    });
  }

  static async addskills(data) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const endpoint = "user_skills";
        HttpClient.post(endpoint, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500);
    });
  }

  static async deleteSkills(id) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const endpoint = "user_skills/" + id;
        HttpClient.delete(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500);
    });
  }

  static async getSkills() {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const endpoint = "user_skills/all";
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500);
    });
  }

  static async MyProfileRequesttt() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "users/profile";

        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async updatejobstatus(data, id, notificationId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "jobs/update/status/" + id + `?notification_id=${notificationId}`;
        HttpClient.patch(endpoint, data)
          .then((response) => {
            resolve(response);
            showMessage({
              message: "Successfully updated job status",
              type: "success",
            });
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async updatenotification(data, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "user_settings/" + id;

        HttpClient.patch(endpoint, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async updateJobReminder(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "/user_settings/update/job_reminder";

        HttpClient.patch(endpoint, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async getnotification() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "notifications";
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async notificationmark(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "notifications/" + id;

        HttpClient.patch(endpoint, { "is_read": 1 })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async notificationMarkAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "notifications/update/all";
        HttpClient.patch(endpoint, { "is_read": 1 })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async shiftsdetail(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "shifts/details/" + id;
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async createshifts(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "shifts";
        HttpClient.post(endpoint, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async editshift(id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "shifts/update/" + id;
        HttpClient.patch(endpoint, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async shiftsdeleteapi(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "shifts/" + id;
        HttpClient.delete(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500)
    });
  }

  static async getHomeData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = "dashboard/employee";
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async getJobs(status) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `jobs/employee?status=${status}`;
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async getJobDetails(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `jobs/job/${id}`;
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async getJobDetails(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `jobs/job/${id}`;
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async timeIn(body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `job_hours`;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async timeOut(id, body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `job_hours/${id}`;
        HttpClient.patch(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
            console.log("error getHome response", error.response.data);
          });
      }, 500)
    });
  }

  static async getHourLogs(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `job_hours/${id}`;
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async contactRequest(body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `users/contact-us`;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async startChat(body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `chat`;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async endChat(body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `chat/end`;
        HttpClient.post(endpoint, body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async getPages() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const endpoint = `page`;
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          });
      }, 500)
    });
  }

  static async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const endpoint = `users/logout`;
        HttpClient.get(endpoint)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            resolve(error)
          });
      }, 500);
    });
  }
}
