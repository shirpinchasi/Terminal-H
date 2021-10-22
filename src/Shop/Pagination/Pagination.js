import React, { useState,useParams,useEffect } from "react";
import config from "../../config/config"
import ReactPaginate from "react-paginate";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



function Pagination (props) {

    return(
        <>
        <div>
        <ReactPaginate
                        className="pagination"
                        previousLabel={"הקודם"}
                        nextLabel={"הבא"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={props.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={props.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        initialPage={0}
                    />
        </div>
         <div id="phonePagination">
                        <div>

                            {props.totalNumbers || 1}
                        </div>
                        /

                        <FormControl>

                            <InputLabel ></InputLabel>

                            <Select
                                labelId="select"
                                id="selectOptionPage"
                                value={props.page || 1}
                                onChange={props.handlePageChange}
                            >
                                {props.pageOptions.map((pageNum) =>
                                    <MenuItem key={pageNum.value} value={pageNum.value} className="abc" >{pageNum.value}</MenuItem>
                                )}

                            </Select>
                        </FormControl>
                    </div>
        </>
    )
}
export default Pagination;