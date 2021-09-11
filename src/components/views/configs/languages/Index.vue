<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-card>
            <b-row>
                <b-col md="5" class="my-1">
                    <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">{{$t('Clear')}}</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col md="3" class="my-1">
                    <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
                        <b-input-group>
                            <b-form-select v-model="sortBy" :options="sortOptions">
                                <option slot="first" :value="null">-- none --</option>
                            </b-form-select>
                            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
                                <option :value="false">Asc</option> <option :value="true">Desc</option>
                            </b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col md="2" class="my-1">
                    <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
                        <b-form-select v-model="sortDirection">
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                            <option value="last">Last</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>

                <b-col md="2" class="my-1">
                    <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <br>
            <div class="float-right" >
                <b-button
                        type="button"
                        title="sync"
                        variant="primary"
                        size="sm"
                        class="add"
                        @click.prevent="sysc()"
                        
                ><i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("sync") }}
                </b-button>
            </div>

            <div>
                <div class="float-left">
                <h5>
                    <i class="fa fa-th-list fa-sm"></i>&nbsp;{{ $t("language") }} {{ $t("list") }}
                </h5>
                </div>
                <div class="float-right mr-2" >
                    <b-button
                            type="button"
                            title="Add"
                            variant="success"
                            size="sm"
                            class="add"
                            @click.prevent="customModal('')"
                    ><i class="fa fa-plus-circle fa-sm"></i>&nbsp;{{ $t("add") }}
                    </b-button>
                </div>



            </div>
            <div style="margin-top:40px;"></div>

            <!-- Main table element -->
            <div class="mt-3">
            <b-table
                    show-empty
                    stacked="md"
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    @filtered="onFiltered"
            >
                <template slot="key" slot-scope="row">
                    {{row.index+1}}
                </template>
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" variant="primary" @click="info(row.item, row.index, $event.target)" class="mr-1">
                       {{$t('Edit')}}
                    </b-button>
                    <b-button size="sm" variant="danger" @click="deleteSavings(row.item.id)">
                        {{$t('Delect')}}
                    </b-button>
                </template>

                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                        </ul>
                    </b-card>
                </template>
            </b-table>
            </div>
            <b-row>
                <b-col md="4"> </b-col>
                <b-col md="6" class="my-1" >
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            class="my-0"
                    ></b-pagination>
                </b-col>
            </b-row>

            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                <pre>{{ infoModal.content }}</pre>
            </b-modal>

            <div>
                <custom-modal size="lg" v-if="isModalVisible" @close="closeModal" :componentAddress="component_address" :title="title" :id="edit_id"> </custom-modal>
            </div>
        </b-card>
    </b-container>

</template>

<script src="@/components/services/configs/languages/index.js"></script>
