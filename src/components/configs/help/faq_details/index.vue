<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">

                <b-card>
                    <custom-modal
                            v-if="isModalVisible"
                            @close="closeModal"
                            :componentAddress="component_address"
                            :title="title"
                            :data="edit_data">
                    </custom-modal>

                    <div slot="header">
                        <h5><i class="fa fa-th-list fa-sm"></i>&nbsp;{{ page_title }}</h5>
                        <b-button
                                variant="info"
                                size="sm"
                                class="add"
                                v-on:click="customModal('')">
                            <i class="fa fa-plus fa-sm"></i>&nbsp;{{ $t("add") }}
                        </b-button>
                    </div>

                    <div class="table-responsive">
                        <b-alert :variant="variantColor" :show="showDismissibleAlert" v-if="redirectMessage !=''" >{{redirectMessage}}{{timeOutMethod()}}</b-alert>
                        <div>

                            <CommonIndex
                                    :table_data="FAQ"
                                    @edit="customModal"
                                    @delete="loadData"
                                    :delete_info="delete_info"
                                    :table_head="head_information"
                                    :offset="0">
                            </CommonIndex>
                        </div>
                    </div>
                    <Pagination class = "paginate" v-if="(total_rows>0)" :paginationData="total_rows"
                                @pagination="loadData"></Pagination>
                </b-card>
            </b-col>
        </b-row>

    </div>
</template>
<script src="@/components/services/configs/help/faq_details/index.js"></script>
