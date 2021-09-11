<template>
    <div class="animated fadeIn entry-list" v-if="has_error==false">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>Search</legend>
                        <b-form inline @submit.prevent="loadData()" autocomplete="off">
                            <!-- <b-form-group
                                    :label='this.$t("date_from") '
                                    label-for="txt_date_from"
                                    :label-cols="3"
                                    :horizontal="true"> -->

                                <date-picker :placeholder="$t('date_from')" class="datepicker" date-format="yy-mm-dd"
                                             v-model="txt_date_from"
                                             name="txt_date_from"
                                             v-validate="'required'">
                                </date-picker>
                            <!-- </b-form-group> -->

                            <!-- <b-form-group
                                    :label='this.$t("date_to")'
                                    label-for="txt_date_to"
                                    :label-cols="3"
                                    :horizontal="true"> -->

                                <date-picker :placeholder="$t('date_to')" class="datepicker" date-format="yy-mm-dd"
                                             v-model="txt_date_to"
                                             name="txt_date_to"
                                             v-validate="'required'">
                                </date-picker>&nbsp;&nbsp;
                            <!-- </b-form-group> -->

                            <b-button type="submit" variant="success" size="sm"><i class="fa fa-search fa-sm"></i>&nbsp;{{$t('preview')}}</b-button>
                        </b-form>
                    </fieldset>
                </div>

                <b-card>

                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{$t('database_download')}}</h5>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-bordered report-table">
                            <thead>
                                <th>SL</th>
                                <th>{{$t('file_name')}}</th>
                                <th>{{$t('file_size')}}</th>
                                <th>{{$t('action')}}</th>
                            </thead>
                            <tr v-for="(data,index) in database_list">
                                <td>{{index+1}}</td>
                                <td>{{data.filename}}</td>
                                <td>{{data.filesize}}</td>
                                <td><a :href="data.url">{{$t('download')}}</a></td>
                            </tr>
                        </table>
                    </div>
                    <Loading :show="loading_show"></Loading>
                    <div>
                        <Pagination  :paginationData=total_rows
                                     @pagination="loadData"></Pagination>
                    </div>

                </b-card>
            </b-col>
        </b-row>

    </div>
</template>

<script src="@/components/services/admin/database_downloads/DatabaseDownload.js"></script>

