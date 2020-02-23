import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        gridColumn: "3 / 4",
        gridRow: "4 / 5",
        padding: "24px 0",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    list: {
        flexDirection: "column"
    },
    primary: {
        cursor: "pointer"
    },
    secondary: {
        whiteSpace: "nowrap",
        overflowX: "scroll",
        boxShadow: "0px 1px 3px 1px grey",
        marginTop: 8
    }
}));

export default function UrlHistory({minifiedUrls}) {
    const classes = useStyles();

    function openLink(event) {
        event.preventDefault();
        window.open(event.currentTarget.innerHTML);
    }

    function renderMinifiedUrls() {
        return minifiedUrls.reverse().map((urlObj, i) =>
            <React.Fragment key={`${urlObj.minified}${i}`}>
                <ListItem alignItems="flex-start">
                <ListItemText
                    primary={<Link onClick={openLink} name="minified">{urlObj.minified}</Link>}
                    primaryTypographyProps={{className: classes.primary}}
                    secondary={urlObj.url}
                    secondaryTypographyProps={{className: classes.secondary}}
                />
                </ListItem>
                <Divider component="li" />
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="previously-minified-urls"
                    id="minified-urls-list"
                >
                    <Typography className={classes.heading}>Previously Minified Urls</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.list}>
                    <List className={classes.root}>
                        {minifiedUrls && renderMinifiedUrls()}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
