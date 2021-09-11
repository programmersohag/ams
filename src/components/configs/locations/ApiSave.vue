<template>
  <div class="animated fadeIn entry-form">
    <b-form @submit.prevent="handleSubmit" autocomplete="off">
      <!--==================start api table===================================================-->

      <div class="table-responsive">
        <table border="1">
          <thead>
          <tr>
            <th>API INFO</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in locations" :key="index">
            <td>
              <table>
                <tr>
                  <td>NAME</td>
                  <td>:</td>
                  <td>{{ item['NAME'] }}</td>
                </tr>
                <tr>
                  <td>CODE</td>
                  <td>:</td>
                  <td>{{ item['CODE'] }}</td>
                </tr>
                <tr>
                  <td>OPENING DATE</td>
                  <td>:</td>
                  <td>{{ item['opening_date'] }}</td>
                </tr>
                <tr>
                  <td>ADDRESS</td>
                  <td>:</td>
                  <td>{{ item['address'] }}</td>
                </tr>
                <tr>
                  <td>E-mail</td>
                  <td>:</td>
                  <td>{{ item['email'] }}</td>
                </tr>
                <tr>
                  <td>CONTRACT</td>
                  <td>:</td>
                  <td>{{ item['contract'] }}</td>
                </tr>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- ==================end api table===================================================-->
      <div slot="footer" class="text-center">
        <b-button type="reset" class="add" size="sm" @click.prevent="handleSubmitCoreData"
                  variant="success">
          <i class="fa fa-save fa-sm"></i>&nbsp;{{ $t("add") }}
        </b-button>&nbsp;
        <b-button type="reset" variant="primary" class="add" size="sm" @click.prevent="handleReset"><i
          class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
        </b-button>&nbsp;
        <b-button type="reset" size="sm" variant="danger" class="mr-2" @click.prevent="handleCancel"><i
          class="fa fa-close fa-md"></i>{{ $t("cancel") }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script src="@/components/services/configs/locations/ApiSave.js"></script>

<style scoped>

</style>
