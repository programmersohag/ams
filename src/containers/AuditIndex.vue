<template>
  <div class="report-table table-responsive">
    <table class="table table-bordered report-table b-table">
      <thead>
      <tr>
        <th>#</th>
        <th>{{ $t('location') }}</th>
        <th>{{ $t('schedule') }}</th>
        <th>{{ $t('audit') + " " + $t('period') }}</th>
        <th>{{ $t('team') + " " + $t('members') }}</th>
        <th>{{ $t('submitted') + " " + $t('date') }}</th>
        <th>{{ $t('status') }}</th>
        <th>{{ $t('actions') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, key) in table_data" :key="key">
        <td class="text-center">{{ key + 1 }}</td>
        <td>{{ row['location'] }}</td>
        <td>{{ row['schedule'] }}</td>
        <td class="text-center">{{ row['auditPeriod'] }}</td>
        <td>{{ row.members }}</td>
        <td class="text-center">{{ row['createdOn'] }}</td>
        <td class="text-center">
          <div class="" v-if="row['issueStatus'] === 'DRAFT'">
            <b-badge href="#" variant="secondary">{{ row['issueStatus'] }}</b-badge>
          </div>
          <div class="" v-else-if="row['issueStatus'] === 'SUBMITTED'">
            <b-badge href="#" variant="success">{{ row['issueStatus'] }}</b-badge>
          </div>
          <div class="" v-else-if="row['issueStatus'] === 'PENDING'">
            <b-badge href="#" variant="success">{{ row['issueStatus'] }}</b-badge>
          </div>
          <div class="" v-else-if="row['issueStatus'] === 'REJECT'">
            <b-badge href="#" variant="danger">{{ row['issueStatus'] }}</b-badge>
          </div>
          <div class="" v-else-if="row['issueStatus'] === 'REVIEWED'">
            <b-badge href="#" variant="primary">{{ row['issueStatus'] }}</b-badge>
          </div>
          <div class="" v-else-if="row['issueStatus'] === 'REPLY'">
            <b-badge href="#" variant="info">{{ row['issueStatus'] }}</b-badge>
          </div>
          <div class="" v-else-if="row['issueStatus'] === 'FEEDBACK'">
            <b-badge href="#" variant="warning">{{ row['issueStatus'] }}</b-badge>
          </div>
          <div class="" v-else-if="row['issueStatus'] === 'PENDING'">
            <b-badge href="#" variant="secondary">{{ row['issueStatus'] }}</b-badge>
          </div>
        </td>
        <td class="text-center">
          <div class="btn-action" v-if="row['issue_status'] === 'CLOSE'">
            <b-button
              title="View"
              size="sm"
              variant="primary"
              @click="emitView(row.id)"
              class="mr-1">
              <i class="fa fa-eye"></i>
            </b-button>
          </div>
          <div class="btn-action" v-else-if="row['issue_status'] === 'PENDING' || row['issue_status'] === 'REVIEWED'">
            <b-button
              title="View"
              size="sm"
              variant="primary"
              @click="emitView(row.id)"
              class="mr-1">
              <i class="fa fa-eye"></i>
            </b-button>
          </div>
          <div class="btn-action" v-else-if="row['issue_status'] === 'FEEDBACK'">
            <b-button
              title="View"
              size="sm"
              variant="primary"
              @click="emitView(row.id)"
              class="mr-1">
              <i class="fa fa-eye"></i>
            </b-button>
            <b-button
              title="Edit"
              size="sm"
              variant="warning"
              @click="emitEdit(row.id)"
              class="mr-1">
              <i class="fa fa-edit"></i>
            </b-button>
            <b-button
              title="Submit"
              size="sm"
              variant="success"
              @click="emitSubmit(row.id)"
              class="mr-1">
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
            </b-button>
          </div>
          <div class="btn-action" v-else-if="row['issue_status'] === 'DRAFT'">
            <b-button
              title="View"
              size="sm"
              variant="primary"
              @click="emitView(row.id)"
              class="mr-1">
              <i class="fa fa-eye"></i>
            </b-button>
            <b-button
              title="Edit"
              size="sm"
              variant="warning"
              @click="emitEdit(row.id)"
              class="mr-1">
              <i class="fa fa-edit"></i>
            </b-button>
            <b-button
              title="Submit"
              size="sm"
              variant="success"
              @click="emitSubmit(row.id)"
              class="mr-1">
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
            </b-button>
            <b-button
              title="Submit"
              size="sm"
              variant="danger"
              @click="emitDelete(row.id)"
              class="mr-1">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </b-button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import '@/shared/common/confirm-message.js';
  import Loading from 'vue-full-loading';

  export default {
    name: "AuditIndex",
    props: {
      table_data: {type: Array, required: true},
    },
    components: {Loading},
    data() {
      return {
        loading_show: false,
      }
    },
    methods: {
      emitView(itemData) {
        this.$emit("view", itemData);
      },
      emitEdit(itemData) {
        this.$emit("edit", itemData);
      },
      emitSubmit(itemData) {
        this.$emit("submit", itemData);
      },
      emitDelete(itemData) {
        this.$emit("delete", itemData);
      }
    }
  };
</script>
