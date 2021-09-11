import {formatDate} from "@/shared/utils";
import {$axios} from "@/shared/common/http-axios";
import {formatMonth} from "../../../../shared/utils";

export const schedule_head = [
  {key: "index", label: '#', sortable: false},
  {key: "name", label: 'name', sortable: true},
  {key: 'location', label: 'location', sortable: false},
  {key: 'teamType', label: 'team' + ' ' + 'type', sortable: false},
  {key: 'team', label: 'team', sortable: false},
  {key: 'project', label: 'project', sortable: false},
  {key: 'duration', label: 'audit duration', sortable: false},
  {key: 'period', label: 'audit period', sortable: false},
  {key: "scheduleType", label: 'schedule' + " " + 'type', sortable: true},
  {key: "scheduleStatus", label: 'schedule' + " " + 'status', sortable: true},
  {key: 'actions', label: 'actions', sortable: false},
]

export const getScheduleById = (id) => {
  if (id) {
    const params = {id: id};
    const url = 'schedules/findById/' + id;
    return $axios
      .get(url, params)
      .then(res => {
        if (res.data.data) {
          const formData = {};
          formData['code'] = res.data.data.code;
          formData['name'] = res.data.data.name;
          formData['location'] = res.data.data.location.id;
          formData['locationName'] = res.data.data.location.name;
          formData['teamType'] = res.data.data.teamType.id;
          formData['teamTypeName'] = res.data.data.teamType.name;
          formData['team'] = res.data.data.team.id;
          formData['teamName'] = res.data.data.team.name;
          formData['project'] = res.data.data.project.id;
          formData['projectName'] = res.data.data.project.name;
          formData['branchOpeningDate'] = formatDate(res.data.data['branchOpeningDate']);
          formData['lastAuditDate'] = formatDate(res.data.data['lastAuditDate']);
          formData['auditCycleNumber'] = res.data.data['auditCycleNumber'];
          formData['auditingFromDate'] = formatDate(res.data.data['auditingFromDate']);
          formData['auditingToDate'] = formatDate(res.data.data['auditingToDate']);
          formData['auditDurationDay'] = res.data.data['auditDurationDay'];
          formData['auditPeriodFromDate'] = formatDate(res.data.data['auditPeriodFromDate']);
          formData['auditPeriodToDate'] = formatDate(res.data.data['auditPeriodToDate']);
          formData['scheduleStatus'] = res.data.data.scheduleStatus;
          formData['note'] = res.data.data.note;
          formData['scheduleType'] = res.data.data.scheduleType;
          return formData;
        }
        return {};
      });
  }
}
/*export const handleSubmit = (id) => {
  let params = new FormData();
  let url = '/schedules/add';
  if (id) {
    url = '/schedules/edit';
    params.append('id', id);
  }
  for (let key in this.formData) {
    params.append(key, this.formData[key]);
  }
  return $axios
    .post(url, params)
    .then(res => {
      if (res.data.validation_error) {
        let error_message = res.data.validation_error;
      } else {
        let status = 'failed';
        if (res.data.statusCode === 200) {
          status = 'success';
        }
      }
    });
}*/
export const handleReset = (resetData) => {
  const formData = {};
  formData['code'] = resetData.code;
  formData['name'] = resetData.name;
  formData['location'] = resetData.location;
  formData['teamType'] = resetData.teamType;
  formData['team'] = resetData.team;
  formData['project'] = resetData.project;
  formData['lastAuditDate'] = resetData['lastAuditDate'];
  formData['auditCycleNumber'] = resetData['auditCycleNumber'];

  formData['auditingFromDate'] = resetData.auditingFromDate;
  formData['auditingToDate'] = resetData.auditingToDate;
  formData['auditPeriodFromDate'] = resetData.auditPeriodFromDate;
  formData['auditPeriodToDate'] = resetData.auditPeriodToDate;
  formData['auditDurationDay'] = resetData['auditDurationDay'];
  return formData;
}
export const getLocations = () => {
  const url = '/locations';
  return $axios
    .get(url)
    .then(res => {
      if (res.data.statusCode === 200) {
        let location_list = [];
        location_list.push({
          text: "--" + "Select" + "--",
          value: ''
        });
        for (let i = 0; i < res.data.data.locations.length; i++) {
          location_list.push({text: res.data.data.locations[i].name, value: res.data.data.locations[i].id});
        }
        return location_list;
      }
      return [];
    });
}

export const getTeamTypes = () => {
  const url = '/team_types';
  return $axios
    .get(url)
    .then(res => {
      if (res.data.statusCode === 200) {
        let team_type_list = [];
        team_type_list.push({
          text: "--" + "Select" + "--",
          value: ''
        })
        for (let i = 0; i < res.data.data.length; i++) {
          team_type_list.push({text: res.data.data[i].name, value: res.data.data[i].id});
        }
        return team_type_list;
      }
      return [];
    });
}
export const getTeams = (teamTypeId, scheduleId) => {
  const url = '/schedules/teams';
  return $axios
    .post(url, null, {params: {'teamTypeId': teamTypeId, 'scheduleId': scheduleId}})
    .then(res => {
      if (res.data) {
        let team_list = [];
        team_list.push({
          text: "--" + "Select" + "--",
          value: ''
        })
        for (let i = 0; i < res.data.data.length; i++) {
          team_list.push({text: res.data.data[i].name, value: res.data.data[i].id});
        }
        return team_list;
      }
      return [{
        text: "No Team Found",
        value: ''
      }];
    });
}
export const getProjects = () => {
  const url = '/projects';
  return $axios
    .get(url)
    .then(res => {
      if (res.data.statusCode === 200) {
        let project_list = [];
        project_list.push({
          text: "--" + "Select" + "--",
          value: ''
        });
        for (let i = 0; i < res.data.data.length; i++) {
          project_list.push({text: res.data.data[i].name, value: res.data.data[i].id});
        }
        return project_list;
      }
      return [];
    });
}
export const getScheduleStatus = () => {
  return [{
    text: "--" + "Select Status" + "--",
    value: ''
  },
    {
      text: "PENDING",
      value: 'PENDING'
    },
    {
      text: "FEEDBACK",
      value: 'FEEDBACK'
    },
    {
      text: "APPROVED",
      value: 'APPROVED'
    },
    {
      text: "REJECTED",
      value: 'REJECTED'
    }
  ];

}
export const getScheduleType = () => {
  return [{
    text: "--" + "Select Type" + "--",
    value: ''
  },
    {
      text: "Regular Audit",
      value: 'REGULAR_AUDIT'
    },
    {
      text: "Special Audit",
      value: 'SPECIAL_AUDIT'
    }
  ];

}
